import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-3xl">
            🍉
          </div>
          <h1 className="text-xl font-semibold text-zinc-900">Frutería POS</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Inicia sesión para continuar
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 rounded-md bg-green-50 px-3 py-2 text-center text-xs text-green-700">
          Primer acceso: <span className="font-medium">admin@fruteria.com</span>{" "}
          / <span className="font-medium">admin123</span>
        </p>
      </div>
    </main>
  );
}
