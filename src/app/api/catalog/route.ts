import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { errorResponse } from "@/lib/http";
export async function GET() { try { const session = await requireRole(Role.ADMINISTRADORA, Role.PORTERO, Role.RESIDENTE); const [towers, areas, apartments] = await Promise.all([db.tower.findMany({ orderBy: { name: "asc" } }), db.commonArea.findMany({ orderBy: { name: "asc" } }), session.role === Role.RESIDENTE ? db.apartment.findMany({ where: { residents: { some: { userId: session.userId } } }, include: { tower: true } }) : db.apartment.findMany({ include: { tower: true }, orderBy: [{ tower: { name: "asc" } }, { number: "asc" }] })]); return NextResponse.json({ towers, areas, apartments }); } catch (e) { return errorResponse(e); } }
