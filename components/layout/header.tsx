"use client";

import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { ROLE_LABELS } from "@/constants/roles";
import type { User } from "@/types/user";

const titles: Record<string, string> = {
  "/dashboard": "Panel",
  "/pos": "Punto de venta",
  "/productos": "Productos",
  "/inventario": "Inventario",
  "/compras": "Compras",
  "/proveedores": "Proveedores",
  "/ventas": "Ventas",
  "/caja": "Caja",
  "/usuarios": "Usuarios",
  "/configuracion": "Configuración",
};

export function Header({
  user,
  onMenuClick,
}: {
  user: User | null;
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Frutería POS";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur md:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden"
          aria-label="Abrir menú"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-zinc-900">{user?.name}</p>
          <p className="text-xs text-zinc-500">
            {user ? ROLE_LABELS[user.role] : ""}
          </p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="ghost" size="sm">
            Salir
          </Button>
        </form>
      </div>
    </header>
  );
}
