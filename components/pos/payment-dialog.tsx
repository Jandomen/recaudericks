"use client";

import { useState } from "react";
import { createSaleAction } from "@/actions/sale.actions";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  type PaymentMethod,
} from "@/constants/payment-methods";
import { formatMoney } from "@/lib/utils";
import type { CartItem } from "@/hooks/use-cart";

export interface PaymentResult {
  saleId: string;
  paymentMethod: PaymentMethod;
  amountReceived: number;
  change: number;
}

export function PaymentDialog({
  open,
  onClose,
  total,
  items,
  onComplete,
}: {
  open: boolean;
  onClose: () => void;
  total: number;
  items: CartItem[];
  onComplete: (result: PaymentResult) => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PAYMENT_METHODS.CASH
  );
  const [received, setReceived] = useState((total / 100).toFixed(2));
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const isCash = paymentMethod === PAYMENT_METHODS.CASH;
  const receivedCents =
    Math.round(Number.parseFloat(received.replace(",", ".") || "0") * 100) || 0;
  const change = isCash ? Math.max(0, receivedCents - total) : 0;
  const canConfirm = isCash ? receivedCents >= total : true;

  async function handleConfirm() {
    if (!canConfirm || pending) return;

    setPending(true);
    setError("");

    const result = await createSaleAction({
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        unit: item.unit,
        price: item.price,
        quantity: item.quantity,
      })),
      paymentMethod,
      amountReceived: isCash ? receivedCents : total,
      change,
    });

    if (result.ok && result.saleId) {
      onComplete({
        saleId: result.saleId,
        paymentMethod,
        amountReceived: isCash ? receivedCents : total,
        change,
      });
    } else {
      setError(result.message ?? "No se pudo registrar la venta.");
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="Cobrar venta">
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-zinc-600">
          <span>Total a cobrar</span>
          <span className="text-lg font-bold text-zinc-900">
            {formatMoney(total)}
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-zinc-700">
            Método de pago
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[]).map(
              (method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-md border px-2 py-2 text-sm font-medium transition-colors ${
                    paymentMethod === method
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-zinc-300 text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {PAYMENT_METHOD_LABELS[method]}
                </button>
              )
            )}
          </div>
        </div>

        {isCash ? (
          <div>
            <label
              htmlFor="received"
              className="mb-1 block text-sm font-medium text-zinc-700"
            >
              Monto recibido (MXN)
            </label>
            <Input
              id="received"
              type="number"
              step="0.01"
              min="0"
              value={received}
              onChange={(event) => setReceived(event.target.value)}
            />
            {receivedCents < total && (
              <p className="mt-1 text-xs text-red-600">
                El monto recibido es menor al total.
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-md bg-zinc-50 px-3 py-2 text-sm text-zinc-600">
            El pago con {PAYMENT_METHOD_LABELS[paymentMethod]} se registra por
            el total de la venta.
          </div>
        )}

        {isCash && (
          <div className="flex justify-between text-sm text-zinc-600">
            <span>Cambio</span>
            <span className="font-semibold text-zinc-900">
              {formatMoney(change)}
            </span>
          </div>
        )}

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={pending}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={handleConfirm}
            disabled={!canConfirm || pending}
          >
            {pending ? "Procesando..." : "Confirmar venta"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
