import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
export async function POST(request: NextRequest) {
  try {
    const { email, password } = z.object({ email: z.string().email(), password: z.string().min(1) }).parse(await request.json());
    const user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (!user || !user.active || !(await compare(password, user.passwordHash))) return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
    await createSession({ userId: user.id, role: user.role, name: user.name });
    return NextResponse.json({ name: user.name, role: user.role });
  } catch { return NextResponse.json({ error: "Verifica los datos ingresados" }, { status: 400 }); }
}
