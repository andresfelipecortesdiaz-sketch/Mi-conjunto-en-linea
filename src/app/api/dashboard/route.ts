import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { errorResponse } from "@/lib/http";
export async function GET() {
  try {
    const session = await requireRole(Role.ADMINISTRADORA, Role.PORTERO, Role.RESIDENTE);
    const apartmentScope = session.role === Role.RESIDENTE ? { apartment: { residents: { some: { userId: session.userId } } } } : {};
    const [apartments, residents, pendingPackages, receivedToday, delivered, oldPackages, pendingReservations, approvedReservations, pendingPqrs, resolvedPqrs] = session.role === Role.ADMINISTRADORA ? await Promise.all([
      db.apartment.count(), db.residentProfile.count(), db.package.count({ where: { status: "RECIBIDO" } }), db.package.count({ where: { receivedAt: { gte: new Date(new Date().setHours(0,0,0,0)) } } }), db.package.count({ where: { status: "ENTREGADO" } }), db.package.count({ where: { status: "RECIBIDO", receivedAt: { lt: new Date(Date.now() - 15 * 86400_000) } } }), db.reservation.count({ where: { status: "PENDIENTE" } }), db.reservation.count({ where: { status: "APROBADA" } }), db.pQRS.count({ where: { status: { in: ["RECIBIDA", "EN_REVISION"] } } }), db.pQRS.count({ where: { status: { in: ["RESPONDIDA", "CERRADA"] } } })
    ]) : [0, 0, await db.package.count({ where: { status: "RECIBIDO", ...apartmentScope } }), await db.package.count({ where: { receivedAt: { gte: new Date(new Date().setHours(0,0,0,0)) }, ...apartmentScope } }), await db.package.count({ where: { status: "ENTREGADO", ...apartmentScope } }), await db.package.count({ where: { status: "RECIBIDO", receivedAt: { lt: new Date(Date.now()-15*86400_000) }, ...apartmentScope } }), 0, 0, 0, 0];
    return NextResponse.json({ apartments, residents, pendingPackages, receivedToday, delivered, oldPackages, pendingReservations, approvedReservations, pendingPqrs, resolvedPqrs, role: session.role });
  } catch (e) { return errorResponse(e); }
}
