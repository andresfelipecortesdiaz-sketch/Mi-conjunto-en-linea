import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { errorResponse } from "@/lib/http";
import { z } from "zod";
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireRole(Role.ADMINISTRADORA); const { id } = await params;
    const input = z.object({ status: z.enum(["EN_REVISION", "RESPONDIDA", "CERRADA"]), message: z.string().min(3).max(2000) }).parse(await request.json());
    const row = await db.$transaction(async tx => {
      const existing = await tx.pQRS.findUnique({ where: { id } }); if (!existing) throw new Error("Radicado inexistente");
      const changed = await tx.pQRS.update({ where: { id }, data: { status: input.status } });
      await tx.pQRSHistory.create({ data: { pqrsId: id, userId: session.userId, ...input } });
      await tx.auditLog.create({ data: { userId: session.userId, action: "PQRS_UPDATED", entity: "PQRS", entityId: id } }); return changed;
    }); return NextResponse.json(row);
  } catch (e) { return errorResponse(e); }
}
