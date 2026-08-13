import { SignJWT, jwtVerify } from "jose";
import type { SessionPayload } from "@/types/user";

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
  throw new Error(
    "Falta la variable de entorno SESSION_SECRET. Revisa tu archivo .env.local"
  );
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
