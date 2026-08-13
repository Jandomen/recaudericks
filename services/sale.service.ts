import "server-only";

import mongoose, { type ClientSession } from "mongoose";
import type { Unit } from "@/constants/units";
import { connectToDatabase } from "@/lib/mongodb";
import { InventoryMovementModel } from "@/models/InventoryMovement";
import { ProductModel } from "@/models/Product";
import { SaleModel } from "@/models/Sale";
import { UserModel } from "@/models/User";
import type { Sale, SaleInput } from "@/types/sale";

const TRANSACTION_NOT_SUPPORTED =
  /transaction numbers are only allowed on a replica set member or mongos/i;

type SaleDocPlain = {
  _id: mongoose.Types.ObjectId;
  items: Array<{
    productId: mongoose.Types.ObjectId;
    name: string;
    unit: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  amountReceived: number;
  change: number;
  sellerId: mongoose.Types.ObjectId;
  sellerName: string;
  createdAt: Date;
  updatedAt: Date;
};

function mapSale(doc: SaleDocPlain): Sale {
  return {
    _id: doc._id.toString(),
    items: (doc.items ?? []).map((item) => ({
      productId: item.productId.toString(),
      name: item.name,
      unit: item.unit as Unit,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.subtotal,
    })),
    subtotal: doc.subtotal,
    discount: doc.discount,
    total: doc.total,
    paymentMethod: doc.paymentMethod as Sale["paymentMethod"],
    amountReceived: doc.amountReceived,
    change: doc.change,
    sellerId: doc.sellerId.toString(),
    sellerName: doc.sellerName,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function performSale(
  input: SaleInput,
  session: ClientSession | null
): Promise<Sale> {
  const user = await UserModel.findById(input.sellerId).select("name").lean();
  const sellerName = user?.name ?? "Vendedor";

  const options = session ? { session } : {};

  const items = [];
  for (const item of input.items) {
    const updated = await ProductModel.findOneAndUpdate(
      { _id: item.productId, active: true, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { new: true, ...options }
    );

    if (!updated) {
      throw new Error(`Stock insuficiente para ${item.name}.`);
    }

    items.push({
      productId: item.productId,
      name: item.name,
      unit: item.unit,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    });
  }

  const [saleDoc] = await SaleModel.create(
    [
      {
        items,
        subtotal: input.subtotal,
        discount: 0,
        total: input.total,
        paymentMethod: input.paymentMethod,
        amountReceived: input.amountReceived,
        change: input.change,
        sellerId: input.sellerId,
        sellerName,
      },
    ],
    options
  );

  await InventoryMovementModel.create(
    items.map((item) => ({
      productId: item.productId,
      quantity: -item.quantity,
      type: "venta",
      referenceId: saleDoc._id,
      notes: `Venta ${saleDoc._id.toString()}`,
    })),
    options
  );

  return mapSale(saleDoc.toObject() as unknown as SaleDocPlain);
}

async function createSaleWithTransaction(input: SaleInput): Promise<Sale> {
  const session = await mongoose.startSession();
  let transactionStarted = false;

  try {
    session.startTransaction();
    transactionStarted = true;

    const sale = await performSale(input, session);

    await session.commitTransaction();
    return sale;
  } catch (error) {
    if (transactionStarted) {
      await session.abortTransaction().catch(() => {});
    }
    throw error;
  } finally {
    session.endSession();
  }
}

export async function createSale(input: SaleInput): Promise<Sale> {
  await connectToDatabase();

  try {
    return await createSaleWithTransaction(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (TRANSACTION_NOT_SUPPORTED.test(message)) {
      return performSale(input, null);
    }

    throw error;
  }
}

export async function getSales(options: {
  date?: string;
  limit?: number;
} = {}): Promise<Sale[]> {
  await connectToDatabase();

  const filter: Record<string, unknown> = {};

  if (options.date) {
    const start = new Date(`${options.date}T00:00:00.000Z`);
    const end = new Date(`${options.date}T23:59:59.999Z`);
    filter.createdAt = { $gte: start, $lte: end };
  }

  const docs = await SaleModel.find(filter)
    .sort({ createdAt: -1 })
    .limit(options.limit ?? 100)
    .lean();

  return docs.map((doc) => mapSale(doc as unknown as SaleDocPlain));
}

export async function getSaleById(id: string): Promise<Sale | null> {
  await connectToDatabase();

  const doc = await SaleModel.findById(id).lean();

  if (!doc) return null;

  return mapSale(doc as unknown as SaleDocPlain);
}
