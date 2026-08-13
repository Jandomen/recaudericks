"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LoginState } from "@/types/user";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState | undefined, FormData>(
    loginAction,
    undefined
  );

  return (
    <form action={action} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-zinc-700"
        >
          Correo electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@correo.com"
          required
          autoComplete="email"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-zinc-700"
        >
          Contraseña
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
        {state?.errors?.password && (
          <p className="mt-1 text-xs text-red-600">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {state?.message && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
