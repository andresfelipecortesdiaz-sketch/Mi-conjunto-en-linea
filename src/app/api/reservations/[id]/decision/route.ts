import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { errorResponse } from "@/lib/http";
import { z } from "zod";
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireRole(Role.ADMINISTRADORA);
    const { id } = await params;
    const { status, reason } = z.object({ status: z.enum(["APROBADA", "RECHAZADA"]), reason: z.string().max(500).optional() }).parse(await request.json());
    if (status === "RECHAZADA" && !reason?.trim()) return NextResponse.json({ error: "Escribe el motivo del rechazo" }, { status: 400 });
    const result = await db.$transaction(async tx => {
      const r = await tx.reservation.findUnique({ where: { id } }); if (!r || r.status !== "PENDIENTE") throw new Error("La solicitud no está pendiente");
      if (status === "APROBADA") {
        const overlap = await tx.reservation.count({ where: { id: { not: id }, commonAreaId: r.commonAreaId, date: r.date, slot: r.slot, status: "APROBADA" } });
        if (overlap) throw new Error("La franja ya tiene una reserva aprobada");
      }
      const updated = await tx.reservation.update({ where: { id }, data: { status, rejectionReason: status === "RECHAZADA" ? reason : null, approvedById: session.userId } });
      await tx.auditLog.create({ data: { userId: session.userId, action: `RESERVATION_${status}`, entity: "Reservation", entityId: id } }); return updated;
    }, { isolationLevel: "Serializable" });
    return NextResponse.json(result);
  } catch (e) { return errorResponse(e); }
}
