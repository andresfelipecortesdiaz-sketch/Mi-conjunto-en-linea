import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { errorResponse } from "@/lib/http";
export async function GET(request: NextRequest) {
  try {
    await requireRole(Role.ADMINISTRADORA);
    const params = new URL(request.url).searchParams;
    const month = params.get("month") ?? new Date().toISOString().slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(month)) return NextResponse.json({ error: "Formato mensual esperado YYYY-MM" }, { status: 400 });
    const start = new Date(`${month}-01T00:00:00-05:00`); const end = new Date(start); end.setMonth(end.getMonth() + 1);
    const [received, delivered, pending, old, reservations, approved, rejected, pqrs, pqrsResolved, pqrsPending] = await Promise.all([
      db.package.count({ where: { receivedAt: { gte: start, lt: end } } }), db.package.count({ where: { status: "ENTREGADO", delivery: { deliveredAt: { gte: start, lt: end } } } }), db.package.count({ where: { status: "RECIBIDO" } }), db.package.count({ where: { status: "RECIBIDO", receivedAt: { lt: new Date(Date.now() - 15 * 86400_000) } } }), db.reservation.count({ where: { createdAt: { gte: start, lt: end } } }), db.reservation.count({ where: { createdAt: { gte: start, lt: end }, status: "APROBADA" } }), db.reservation.count({ where: { createdAt: { gte: start, lt: end }, status: "RECHAZADA" } }), db.pQRS.count({ where: { createdAt: { gte: start, lt: end } } }), db.pQRS.count({ where: { createdAt: { gte: start, lt: end }, status: { in: ["RESPONDIDA", "CERRADA"] } } }), db.pQRS.count({ where: { createdAt: { gte: start, lt: end }, status: { in: ["RECIBIDA", "EN_REVISION"] } } })
    ]);
    const rows = [["Indicador", "Cantidad"], ["Paquetes recibidos", received], ["Paquetes entregados", delivered], ["Paquetes pendientes", pending], ["Paquetes antiguos", old], ["Reservas", reservations], ["Reservas aprobadas", approved], ["Reservas rechazadas", rejected], ["PQRS", pqrs], ["PQRS resueltas", pqrsResolved], ["PQRS pendientes", pqrsPending]];
    if (params.get("format") === "csv") return new NextResponse("\uFEFF" + rows.map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\r\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename=reporte-${month}.csv` } });
    return NextResponse.json({ month, received, delivered, pending, old, reservations, approved, rejected, pqrs, pqrsResolved, pqrsPending });
  } catch (e) { return errorResponse(e); }
}
