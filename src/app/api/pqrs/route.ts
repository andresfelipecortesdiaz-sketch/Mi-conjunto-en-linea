import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { pqrsSchema } from "@/lib/validation";
import { errorResponse } from "@/lib/http";
import { randomBytes } from "node:crypto";
export async function GET() {
  try { const session = await requireRole(Role.ADMINISTRADORA, Role.RESIDENTE); const rows = await db.pQRS.findMany({ where: session.role === Role.RESIDENTE ? { userId: session.userId } : {}, include: { user: { select: { name: true } }, history: { orderBy: { createdAt: "asc" } } }, orderBy: { createdAt: "desc" }, take: 300 }); return NextResponse.json(rows); } catch (e) { return errorResponse(e); }
}
export async function POST(request: NextRequest) {
  try {
    const session = await requireRole(Role.RESIDENTE);
    const input = pqrsSchema.parse(await request.json());
    const ticket = `AP-${new Date().getFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`;
    const row = await db.$transaction(async tx => {
      const created = await tx.pQRS.create({ data: { ...input, ticket, userId: session.userId } });
      await tx.pQRSHistory.create({ data: { pqrsId: created.id, userId: session.userId, status: "RECIBIDA", message: "Solicitud radicada" } }); return created;
    });
    return NextResponse.json(row, { status: 201 });
  } catch (e) { return errorResponse(e); }
}
