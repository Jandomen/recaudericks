import type { PaymentMethod } from "@/constants/payment-methods";
import type { Unit } from "@/constants/units";

export interface SaleItem {
  productId: string;
  name: string;
  unit: Unit;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  _id: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  amountReceived?: number;
  change?: number;
  sellerId: string;
  sellerName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItemInput {
  productId: string;
  name: string;
  unit: Unit;
  price: number;
  quantity: number;
}

export interface SaleInput {
  items: SaleItemInput[];
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  amountReceived: number;
  change: number;
  sellerId: string;
}

export interface CreateSaleResult {
  ok: boolean;
  saleId?: string;
  message?: string;
}
