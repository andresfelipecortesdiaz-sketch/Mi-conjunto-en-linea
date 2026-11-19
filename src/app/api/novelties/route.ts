import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { noveltySchema } from "@/lib/validation";
import { errorResponse } from "@/lib/http";
export async function GET(request: NextRequest) {
  try { const session = await requireRole(Role.PORTERO, Role.ADMINISTRADORA); const followUp = new URL(request.url).searchParams.get("pending"); const rows = await db.shiftNovelty.findMany({ where: { ...(session.role === Role.PORTERO ? { createdAt: { gte: new Date(Date.now() - 36 * 3600_000) } } : {}), ...(followUp === "true" ? { followUp: true, followedAt: null } : {}) }, include: { author: { select: { name: true } } }, orderBy: { createdAt: "desc" }, take: 250 }); return NextResponse.json(rows); } catch (e) { return errorResponse(e); }
}
export async function POST(request: NextRequest) {
  try { const session = await requireRole(Role.PORTERO); const input = noveltySchema.parse(await request.json()); const row = await db.shiftNovelty.create({ data: { ...input, authorId: session.userId } }); return NextResponse.json(row, { status: 201 }); } catch (e) { return errorResponse(e); }
}
