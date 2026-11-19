import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Escribe un correo válido y tu contraseña" }, { status: 400 });

  const { email, password } = parsed.data;
  let user;
  try {
    user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  } catch (error) {
    console.error("No se pudo consultar al usuario para iniciar sesión", error);
    return NextResponse.json({ error: "No se pudo conectar con la base de datos. Revisa que PostgreSQL esté iniciado y DATABASE_URL configurada en .env." }, { status: 503 });
  }

  if (!user || !user.active || !(await compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Correo o contraseña incorrectos" }, { status: 401 });
  }

  try {
    await createSession({ userId: user.id, role: user.role, name: user.name });
    return NextResponse.json({ name: user.name, role: user.role });
  } catch (error) {
    console.error("No se pudo crear la sesión de usuario", error);
    return NextResponse.json({ error: "No se pudo crear la sesión. Revisa SESSION_SECRET en .env." }, { status: 500 });
  }
}
