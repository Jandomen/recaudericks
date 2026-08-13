"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { authenticate, deleteSession } from "@/lib/auth";
import type { LoginState } from "@/types/user";

const loginSchema = z.object({
  email: z.email("Ingresa un email válido").trim().toLowerCase(),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function loginAction(
  _prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const validated = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  const result = await authenticate(email, password);

  if (!result.success) {
    return { message: result.message };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
