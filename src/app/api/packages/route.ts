import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { packageSchema } from "@/lib/validation";
import { errorResponse } from "@/lib/http";
export async function GET(request: NextRequest) {
  try {
    const session = await requireRole(Role.ADMINISTRADORA, Role.PORTERO, Role.RESIDENTE);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as "RECIBIDO" | "ENTREGADO" | null;
    const tower = searchParams.get("tower");
    const where = { ...(status ? { status } : {}), ...(session.role === Role.RESIDENTE ? { apartment: { residents: { some: { userId: session.userId } } } } : {}), ...(tower && session.role !== Role.RESIDENTE ? { apartment: { towerId: tower } } : {}) };
    const rows = await db.package.findMany({ where, include: { apartment: { include: { tower: true } }, delivery: true }, orderBy: { receivedAt: "desc" }, take: 250 });
    return NextResponse.json(rows);
  } catch (e) { return errorResponse(e); }
}
export async function POST(request: NextRequest) {
  try {
    const session = await requireRole(Role.PORTERO, Role.ADMINISTRADORA);
    const input = packageSchema.parse(await request.json());
    const apartment = await db.apartment.findUnique({ where: { id: input.apartmentId }, include: { residents: true } });
    if (!apartment) return NextResponse.json({ error: "Apartamento inexistente" }, { status: 404 });
    if (!apartment.residents.length) return NextResponse.json({ error: "El apartamento no tiene residentes registrados" }, { status: 400 });
    const row = await db.package.create({ data: { ...input, recordedById: session.userId } });
    await db.auditLog.create({ data: { userId: session.userId, action: "PACKAGE_RECEIVED", entity: "Package", entityId: row.id } });
    return NextResponse.json(row, { status: 201 });
  } catch (e) { return errorResponse(e); }
}
