import { NextResponse } from "next/server";
export function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Error interno";
  const code = typeof error === "object" && error !== null && "code" in error ? String((error as { code: unknown }).code) : "";
  const status = message === "NO_SESSION" ? 401 : message === "FORBIDDEN" ? 403 : code === "P2002" || code === "P2034" ? 409 : error instanceof Error && error.name === "ZodError" ? 400 : error instanceof Error && error.name === "Error" ? 400 : 500;
  const safeMessage = status === 500 ? "No fue posible completar la operación" : code === "P2002" ? "Ya existe un registro con esos datos" : code === "P2034" ? "La operación tuvo un conflicto; intenta de nuevo" : message;
  return NextResponse.json({ error: safeMessage }, { status });
}
export function badRequest(message: string) { return NextResponse.json({ error: message }, { status: 400 }); }
