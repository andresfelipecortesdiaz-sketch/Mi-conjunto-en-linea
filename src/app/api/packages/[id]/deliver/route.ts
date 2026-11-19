import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole } from "@/lib/session";
import { deliverySchema } from "@/lib/validation";
import { errorResponse } from "@/lib/http";
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireRole(Role.PORTERO, Role.ADMINISTRADORA);
    const { id } = await params;
    const input = deliverySchema.parse(await request.json());
    const row = await db.$transaction(async tx => {
      const pack = await tx.package.findUnique({ where: { id }, include: { apartment: { include: { residents: { include: { user: true, authorizedPeople: true } } } } } });
      if (!pack) throw new Error("Paquete inexistente");
      if (pack.status !== "RECIBIDO") throw new Error("El paquete ya fue entregado");
      const resident = pack.apartment.residents.find(r => r.user.name.toLocaleLowerCase("es") === input.receiverName.toLocaleLowerCase("es"));
      const authorized = pack.apartment.residents.some(r => r.authorizedPeople.some(p => p.active && p.name.toLocaleLowerCase("es") === input.receiverName.toLocaleLowerCase("es")));
      if (!resident && !authorized) throw new Error("La persona no figura como residente ni autorizada");
      const delivery = await tx.packageDelivery.create({ data: { packageId: id, receiverName: input.receiverName, receiverType: resident ? "RESIDENTE" : "AUTORIZADO", observations: input.observations, deliveredById: session.userId } });
      await tx.package.update({ where: { id }, data: { status: "ENTREGADO" } });
      await tx.auditLog.create({ data: { userId: session.userId, action: "PACKAGE_DELIVERED", entity: "Package", entityId: id } });
      return delivery;
    }, { isolationLevel: "Serializable" });
    return NextResponse.json(row);
  } catch (e) { return errorResponse(e); }
}
