import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
      <div className="pointer-events-none absolute -left-10 -top-10 select-none text-[10rem] opacity-10">
        🍊
      </div>
      <div className="pointer-events-none absolute -bottom-12 -right-8 select-none text-[11rem] opacity-10">
        🍌
      </div>
      <div className="pointer-events-none absolute right-16 top-14 select-none text-5xl opacity-10">
        🥝
      </div>
      <div className="pointer-events-none absolute left-20 bottom-24 select-none text-5xl opacity-10">
        🍎
      </div>
      <div className="pointer-events-none absolute left-6 top-24 select-none text-4xl opacity-10">
        🍇
      </div>
      <div className="pointer-events-none absolute left-1/4 top-10 select-none text-6xl opacity-10">
        🍓
      </div>
      <div className="pointer-events-none absolute right-10 bottom-32 select-none text-4xl opacity-10">
        🥭
      </div>
      <div className="pointer-events-none absolute right-1/3 bottom-10 select-none text-6xl opacity-10">
        🍍
      </div>
      <div className="pointer-events-none absolute left-1/3 top-16 select-none text-4xl opacity-10">
        🍒
      </div>
      <div className="pointer-events-none absolute right-1/4 top-1/3 select-none text-5xl opacity-10">
        🥥
      </div>
      <div className="pointer-events-none absolute left-1/4 bottom-1/3 select-none text-5xl opacity-10">
        🥑
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/4 select-none text-4xl opacity-10">
        🥕
      </div>
      <div className="pointer-events-none absolute right-1/2 bottom-1/4 select-none text-4xl opacity-10">
        🍋
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-4xl shadow-md shadow-green-200">
            🍉
          </div>
          <span className="mb-2 rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-xs font-medium text-green-700">
            Punto de venta para fruterías
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Frutería POS
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Bienvenido de vuelta, inicia sesión para continuar
          </p>
        </div>

        <LoginForm />
      </div>

      <p className="mt-6 text-xs text-zinc-400">
        Gestiona tu inventario, ventas y caja desde un solo lugar
      </p>

      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-green-700"
      >
        <span aria-hidden>←</span> Volver al inicio
      </Link>
    </main>
  );
}
