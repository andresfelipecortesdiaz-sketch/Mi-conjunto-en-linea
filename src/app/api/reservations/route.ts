import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { reservationSchema } from "@/lib/validation";
import { errorResponse } from "@/lib/http";
export async function GET() {
  try { const session = await requireRole(Role.ADMINISTRADORA, Role.RESIDENTE); const rows = await db.reservation.findMany({ where: session.role === Role.RESIDENTE ? { userId: session.userId } : {}, include: { commonArea: true, apartment: { include: { tower: true } }, user: { select: { name: true } } }, orderBy: { date: "desc" }, take: 300 }); return NextResponse.json(rows); } catch (e) { return errorResponse(e); }
}
export async function POST(request: NextRequest) {
  try {
    const session = await requireRole(Role.RESIDENTE);
    const input = reservationSchema.parse(await request.json());
    const date = new Date(`${input.date}T12:00:00-05:00`);
    if (Number.isNaN(date.getTime()) || date.getTime() - Date.now() < 48 * 3600_000) return NextResponse.json({ error: "La reserva requiere mínimo 48 horas de anticipación" }, { status: 400 });
    const profile = await db.residentProfile.findUnique({ where: { userId: session.userId } });
    if (!profile) return NextResponse.json({ error: "No hay apartamento vinculado a la cuenta" }, { status: 400 });
    const area = await db.commonArea.findUnique({ where: { id: input.commonAreaId } });
    if (!area) return NextResponse.json({ error: "Zona común inexistente" }, { status: 404 });
    if (input.attendees > area.capacity) return NextResponse.json({ error: `La capacidad máxima es ${area.capacity}` }, { status: 400 });
    const schedules = area.schedule as Record<string, string[]>;
    if (!schedules[input.slot]) return NextResponse.json({ error: "Franja no habilitada para esta zona" }, { status: 400 });
    const row = await db.$transaction(async tx => {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1); const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const monthly = await tx.reservation.count({ where: { apartmentId: profile.apartmentId, date: { gte: monthStart, lt: monthEnd }, status: { in: ["PENDIENTE", "APROBADA"] } } });
      if (monthly > 0) throw new Error("El apartamento ya tiene una solicitud vigente este mes");
      const collision = await tx.reservation.count({ where: { commonAreaId: area.id, date, slot: input.slot, status: "APROBADA" } });
      if (collision) throw new Error("La franja ya fue aprobada para otra reserva");
      return tx.reservation.create({ data: { ...input, date, userId: session.userId, apartmentId: profile.apartmentId } });
    }, { isolationLevel: "Serializable" });
    return NextResponse.json(row, { status: 201 });
  } catch (e) { return errorResponse(e); }
}
