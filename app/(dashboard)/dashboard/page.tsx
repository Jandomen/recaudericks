import Link from "next/link";
import { getUser } from "@/lib/auth";

const quickActions = [
  {
    href: "/pos",
    title: "Nueva venta",
    description: "Abrir el punto de venta",
    icon: "🛒",
    color: "bg-green-600",
  },
  {
    href: "/productos",
    title: "Productos",
    description: "Catálogo de frutas y verduras",
    icon: "🍎",
    color: "bg-emerald-500",
  },
  {
    href: "/inventario",
    title: "Inventario",
    description: "Existencias y mermas",
    icon: "📦",
    color: "bg-lime-600",
  },
  {
    href: "/compras",
    title: "Compras",
    description: "Reposición a proveedores",
    icon: "🚚",
    color: "bg-teal-600",
  },
  {
    href: "/caja",
    title: "Caja",
    description: "Aperturas, cierres y arqueo",
    icon: "💰",
    color: "bg-amber-500",
  },
  {
    href: "/ventas",
    title: "Ventas",
    description: "Historial y reportes",
    icon: "📊",
    color: "bg-orange-500",
  },
];

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-zinc-900">
          Hola, {user?.name?.split(" ")[0]} 👋
        </h2>
        <p className="mt-1 text-zinc-500">¿Qué quieres hacer hoy?</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group rounded-xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${action.color} text-xl`}
            >
              {action.icon}
            </div>
            <h3 className="font-semibold text-zinc-900">{action.title}</h3>
            <p className="mt-1 text-sm text-zinc-500">{action.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
