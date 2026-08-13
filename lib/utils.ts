export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(cents / 100);
}

export function priceToCents(value: string): number {
  const num = Number.parseFloat(value.replace(/[^0-9.,]/g, "").replace(",", "."));
  if (Number.isNaN(num) || num < 0) return 0;
  return Math.round(num * 100);
}
