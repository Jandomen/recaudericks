import { redirect } from "next/navigation";
import type { Role } from "@/constants/roles";
import { getSession } from "@/lib/auth";

export async function requireRole(
  roles: Role[]
): Promise<{ userId: string; role: Role }> {
  const session = await getSession();

  if (!session || !roles.includes(session.role)) {
    redirect("/dashboard");
  }

  return { userId: session.userId, role: session.role };
}
