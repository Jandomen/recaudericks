"use client";

import { Button } from "@/components/ui/button";
import {
  PAYMENT_METHOD_LABELS,
  type PaymentMethod,
} from "@/constants/payment-methods";
import { formatMoney } from "@/lib/utils";

export interface ReceiptData {
  saleId: string;
  items: Array<{
    name: string;
    unit: string;
    price: number;
    quantity: number;
    subtotal: number;
  }>;
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  amountReceived: number;
  change: number;
  sellerName: string;
}

export function Receipt({
  receipt,
  onNewSale,
}: {
  receipt: ReceiptData;
  onNewSale: () => void;
}) {
  return (
    <div className="mx-auto max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-3 border-b border-dashed border-zinc-300 pb-3 text-center">
          <h3 className="text-lg font-bold text-zinc-900">Frutería POS</h3>
          <p className="text-xs text-zinc-500">Ticket de venta</p>
        </div>

        <p className="mb-1 text-xs text-zinc-500">
          Folio: {receipt.saleId}
        </p>
        <p className="mb-3 text-xs text-zinc-500">
          Fecha: {new Date().toLocaleString("es-MX")}
        </p>

        <div className="divide-y divide-dashed divide-zinc-200">
          {receipt.items.map((item, index) => (
            <div key={index} className="flex justify-between gap-2 py-1.5 text-sm">
              <div className="min-w-0">
                <p className="font-medium text-zinc-900">{item.name}</p>
                <p className="text-xs text-zinc-500">
                  {item.quantity} {item.unit} × {formatMoney(item.price)}
                </p>
              </div>
              <span className="font-medium text-zinc-900">
                {formatMoney(item.subtotal)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1 border-t border-dashed border-zinc-300 pt-3 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-600">Subtotal</span>
            <span className="text-zinc-900">{formatMoney(receipt.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Total</span>
            <span className="font-bold text-zinc-900">
              {formatMoney(receipt.total)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Pago</span>
            <span className="text-zinc-900">
              {PAYMENT_METHOD_LABELS[receipt.paymentMethod]}
            </span>
          </div>
          {receipt.change > 0 && (
            <div className="flex justify-between">
              <span className="text-zinc-600">Cambio</span>
              <span className="text-zinc-900">
                {formatMoney(receipt.change)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-zinc-600">Atendió</span>
            <span className="text-zinc-900">{receipt.sellerName}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={() => window.print()}
        >
          Imprimir
        </Button>
        <Button type="button" className="flex-1" onClick={onNewSale}>
          Nueva venta
        </Button>
      </div>
    </div>
  );
}
