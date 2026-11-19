import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { errorResponse } from "@/lib/http";
export async function PATCH(_request: Request, { params }: { params: Promise<{ id: string }> }) { try { const session = await requireRole(Role.ADMINISTRADORA); const { id } = await params; const row = await db.shiftNovelty.update({ where: { id }, data: { followedAt: new Date(), followedById: session.userId, followUp: false } }); return NextResponse.json(row); } catch (e) { return errorResponse(e); } }
