import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
export async function GET() { const session = await getSession(); return session ? NextResponse.json(session) : NextResponse.json({ error: "Inicia sesión" }, { status: 401 }); }
