import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

const publicRoutes = ["/", "/login"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = await decrypt(request.cookies.get("session")?.value);

  const isPublic = publicRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  if (!isPublic && !session?.userId) {
    const loginUrl = new URL("/login", request.nextUrl);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublic && session?.userId) {
    const dashboardUrl = new URL("/dashboard", request.nextUrl);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
