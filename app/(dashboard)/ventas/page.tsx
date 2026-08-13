import type { Metadata } from "next";
import { SalesTable } from "@/components/sales/sales-table";
import { getSales } from "@/services/sale.service";

export const metadata: Metadata = {
  title: "Ventas",
};

function todayISO(): string {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60 * 1000)
    .toISOString()
    .slice(0, 10);
}

export default async function VentasPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const selectedDate = date ?? todayISO();

  const sales = await getSales({ date: selectedDate });

  const total = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">Ventas</h2>
          <p className="text-sm text-zinc-500">
            {sales.length} venta(s) el día {selectedDate}
          </p>
        </div>
      </div>

      <form action="/ventas" method="get" className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          name="date"
          defaultValue={selectedDate}
          className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
        />
        <button
          type="submit"
          className="h-10 rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Buscar
        </button>
      </form>

      {sales.length > 0 && (
        <div className="flex flex-wrap gap-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs text-zinc-500">Total del día</p>
            <p className="mt-1 text-xl font-bold text-zinc-900">
              ${(total / 100).toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      )}

      <SalesTable sales={sales} />
    </div>
  );
}
