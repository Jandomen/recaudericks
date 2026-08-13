import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { PAYMENT_METHOD_LABELS } from "@/constants/payment-methods";
import { formatMoney } from "@/lib/utils";
import type { Sale } from "@/types/sale";

export function SalesTable({ sales }: { sales: Sale[] }) {
  if (sales.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
        No hay ventas registradas en este periodo.
      </div>
    );
  }

  return (
    <Table className="min-w-[720px]">
      <THead>
        <TR>
          <TH>Folio</TH>
          <TH>Fecha</TH>
          <TH>Artículos</TH>
          <TH>Método de pago</TH>
          <TH>Cajero</TH>
          <TH className="text-right">Total</TH>
        </TR>
      </THead>
      <TBody>
        {sales.map((sale) => (
          <TR key={sale._id}>
            <TD className="font-mono text-xs text-zinc-500">
              {sale._id.slice(-8).toUpperCase()}
            </TD>
            <TD>
              {new Date(sale.createdAt).toLocaleString("es-MX", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </TD>
            <TD>{sale.items.reduce((sum, item) => sum + item.quantity, 0)}</TD>
            <TD>{PAYMENT_METHOD_LABELS[sale.paymentMethod]}</TD>
            <TD>{sale.sellerName}</TD>
            <TD className="text-right font-semibold text-zinc-900">
              {formatMoney(sale.total)}
            </TD>
          </TR>
        ))}
      </TBody>
    </Table>
  );
}
