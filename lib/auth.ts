import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { encrypt, decrypt } from "@/lib/session";
import { ROLES } from "@/constants/roles";
import type { SessionPayload, User } from "@/types/user";

const SESSION_COOKIE = "session";
const SESSION_DURATION_DAYS = 7;

async function setSessionCookie(session: string) {
  const expiresAt = new Date(
    Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
  );
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function createSession(user: SessionPayload) {
  const session = await encrypt(user);
  await setSessionCookie(session);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get(SESSION_COOKIE)?.value);
  return session;
});

export const verifySession = cache(async (): Promise<SessionPayload> => {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/login");
  }
  return session;
});

export const getUser = cache(async (): Promise<User | null> => {
  const session = await verifySession();

  try {
    await connectToDatabase();
    const user = await UserModel.findById(session.userId).lean();

    if (!user || !user.active) return null;

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return null;
  }
});

async function ensureDefaultAdmin() {
  const count = await UserModel.countDocuments();
  if (count > 0) return;

  const hashedPassword = await bcrypt.hash("admin123", 10);
  await UserModel.create({
    name: "Administrador",
    email: "admin@fruteria.com",
    password: hashedPassword,
    role: ROLES.ADMIN,
    active: true,
  });
}

export async function authenticate(
  email: string,
  password: string
): Promise<{ success: boolean; message?: string }> {
  await connectToDatabase();

  await ensureDefaultAdmin();

  const user = await UserModel.findOne({ email: email.toLowerCase() });

  if (!user) {
    return { success: false, message: "Credenciales inválidas." };
  }

  if (!user.active) {
    return { success: false, message: "El usuario está desactivado." };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { success: false, message: "Credenciales inválidas." };
  }

  await createSession({
    userId: user._id.toString(),
    role: user.role,
    name: user.name,
    email: user.email,
  });

  return { success: true };
}
