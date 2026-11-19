import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
const db = new PrismaClient();
async function main() {
  const passwordHash = await hash("AltosDemo2026!", 12);
  const admin = await db.user.upsert({ where: { email: "admin@altos.test" }, update: {}, create: { name: "Administradora Demo", email: "admin@altos.test", passwordHash, role: "ADMINISTRADORA" } });
  const porter = await db.user.upsert({ where: { email: "porter@altos.test" }, update: {}, create: { name: "Portería Demo", email: "porter@altos.test", passwordHash, role: "PORTERO" } });
  const towers = await Promise.all([1, 2, 3].map(n => db.tower.upsert({ where: { name: `Torre ${n}` }, update: {}, create: { name: `Torre ${n}` } })));
  let demoApartmentId = "";
  for (const tower of towers) for (let n = 101; n <= 180; n++) {
    const apartment = await db.apartment.upsert({ where: { towerId_number: { towerId: tower.id, number: String(n) } }, update: {}, create: { towerId: tower.id, number: String(n) } });
    if (tower.name === "Torre 1" && n === 101) demoApartmentId = apartment.id;
  }
  const resident = await db.user.upsert({ where: { email: "resident@altos.test" }, update: {}, create: { name: "Residente Demo", email: "resident@altos.test", passwordHash, role: "RESIDENTE" } });
  await db.residentProfile.upsert({ where: { userId: resident.id }, update: {}, create: { userId: resident.id, apartmentId: demoApartmentId, consentAt: new Date() } });
  await db.commonArea.upsert({ where: { name: "Salón social" }, update: {}, create: { name: "Salón social", capacity: 60, schedule: { "08:00-14:00": ["08:00-14:00"], "15:00-22:00": ["15:00-22:00"] } } });
  await db.commonArea.upsert({ where: { name: "Zona BBQ" }, update: {}, create: { name: "Zona BBQ", capacity: 20, schedule: { "10:00-16:00": ["10:00-16:00"], "17:00-22:00": ["17:00-22:00"] } } });
  console.info(`Seed listo. Admin ${admin.email}; portería ${porter.email}; residente ${resident.email}.`);
}
main().finally(() => db.$disconnect());
