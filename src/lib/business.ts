export const OLD_PACKAGE_DAYS = 15;
export const RESERVATION_NOTICE_HOURS = 48;
export function isOldPackage(receivedAt: Date, now = new Date()): boolean {
  return now.getTime() - receivedAt.getTime() > OLD_PACKAGE_DAYS * 24 * 60 * 60 * 1000;
}
export function hasReservationNotice(date: Date, now = new Date()): boolean {
  return date.getTime() - now.getTime() >= RESERVATION_NOTICE_HOURS * 60 * 60 * 1000;
}
export function isMonthlyReservationAvailable(existingCount: number): boolean { return existingCount === 0; }
