export const PAYMENT_METHODS = {
  CASH: "efectivo",
  CARD: "tarjeta",
  TRANSFER: "transferencia",
} as const;

export type PaymentMethod =
  (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PAYMENT_METHODS.CASH]: "Efectivo",
  [PAYMENT_METHODS.CARD]: "Tarjeta",
  [PAYMENT_METHODS.TRANSFER]: "Transferencia",
};
