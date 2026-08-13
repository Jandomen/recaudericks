"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROLE_LABELS } from "@/constants/roles";
import type { User } from "@/types/user";

const navItems = [
  { href: "/dashboard", label: "Panel", icon: "🏠" },
  { href: "/pos", label: "Punto de venta", icon: "🛒" },
  { href: "/productos", label: "Productos", icon: "🍎" },
  { href: "/inventario", label: "Inventario", icon: "📦" },
  { href: "/compras", label: "Compras", icon: "🚚" },
  { href: "/proveedores", label: "Proveedores", icon: "🤝" },
  { href: "/ventas", label: "Ventas", icon: "📊" },
  { href: "/caja", label: "Caja", icon: "💰" },
  { href: "/usuarios", label: "Usuarios", icon: "👥" },
  { href: "/configuracion", label: "Configuración", icon: "⚙️" },
] as const;

export function Sidebar({
  user,
  className,
  onNavigate,
}: {
  user: User | null;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-zinc-200 bg-white",
        className
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-lg">
          🍉
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">Frutería POS</p>
          <p className="text-xs text-zinc-500">Punto de venta</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-green-600 text-white"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-4">
        <p className="truncate text-sm font-medium text-zinc-900">
          {user?.name ?? "Usuario"}
        </p>
        <p className="truncate text-xs text-zinc-500">
          {user ? ROLE_LABELS[user.role] : ""}
        </p>
      </div>
    </aside>
  );
}
