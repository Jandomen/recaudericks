import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "No implementado" }, { status: 501 });
}
