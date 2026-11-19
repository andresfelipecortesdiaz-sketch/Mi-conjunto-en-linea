import { describe, expect, it } from "vitest";
import { hasReservationNotice, isMonthlyReservationAvailable, isOldPackage } from "./business";
describe("reglas base", () => {
  it("marca como antiguo un paquete con más de 15 días", () => {
    const now = new Date("2026-11-19T12:00:00Z");
    expect(isOldPackage(new Date("2026-11-03T11:59:59Z"), now)).toBe(true);
    expect(isOldPackage(new Date("2026-11-04T12:00:00Z"), now)).toBe(false);
  });
  it("exige al menos 48 horas de anticipación", () => {
    const now = new Date("2026-11-19T12:00:00Z");
    expect(hasReservationNotice(new Date("2026-11-21T12:00:00Z"), now)).toBe(true);
    expect(hasReservationNotice(new Date("2026-11-21T11:59:59Z"), now)).toBe(false);
  });
  it("permite solo una reserva mensual vigente", () => {
    expect(isMonthlyReservationAvailable(0)).toBe(true);
    expect(isMonthlyReservationAvailable(1)).toBe(false);
  });
});
