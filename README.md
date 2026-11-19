# Mi Conjunto en Línea

Portal de gestión residencial para Altos del Parque: paquetes, reservas, PQRS y bitácora de turnos.

## Requisitos

- Node.js 20 o posterior y npm.
- PostgreSQL 15 o posterior.
- Acceso al registro npm durante la instalación.

## Configuración

```powershell
Copy-Item .env.example .env
# Edite DATABASE_URL y SESSION_SECRET
npm.cmd install
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

Abra `http://localhost:3000`. Para compilar: `npm.cmd run build`; para ejecutar: `npm.cmd start`.

## Credenciales de demostración (solo desarrollo)

Las tres cuentas se crean con contraseña `AltosDemo2026!`:

- Administradora: `admin@altos.test`
- Portería: `porter@altos.test`
- Residente: `resident@altos.test` (Torre 1, apartamento 101)

Las contraseñas se guardan como hash bcrypt. Cambie/elimine estas cuentas antes de publicar o desplegar. Nunca use estas credenciales en producción.

## Funciones implementadas en código

- Sesiones firmadas en cookie HttpOnly y autorización por rol.
- Paquetes, entregas con comprobación de residente/autorizado y aislamiento residencial.
- Solicitud y gestión de reservas con comprobaciones de anticipación, capacidad, mensualidad y franja.
- Radicado e historial de PQRS.
- Bitácora de novedades y seguimiento.
- Dashboard y reporte mensual CSV consultados desde PostgreSQL.
- Seed de 3 torres, 240 apartamentos y dos áreas comunes.

## Estado de validación

La carpeta comenzó vacía. Lint, TypeScript, las pruebas unitarias y el build se ejecutaron correctamente. No se detectó PostgreSQL ni Docker, así que no se pudo aplicar la migración ni ejecutar el seed o las pruebas de integración/E2E. La versión no debe considerarse lista para producción. La importación CSV, la administración completa de residentes y varias vistas aún están pendientes. Consulte [trazabilidad](docs/TRAZABILIDAD.md).

`npm audit` detecta tres alertas altas en Prisma CLI (dependencia de desarrollo `prisma` 6.19.x y `deepmerge-ts`); npm ofrece corrección mediante Prisma 7, un cambio mayor que no se aplicó para evitar cambiar de versión mayor del ORM dentro de esta fase.

## Comandos previstos

`npm run dev`, `npm run build`, `npm run start`, `npm run db:migrate`, `npm run db:seed`, `npm test`.

## Git

Se inicializó un repositorio Git sin historial previo, en la rama `main`. No se creó ningún commit. Convención recomendada: `feat:`, `fix:`, `docs:`, `test:`. Usar `main`, `develop` y ramas de trabajo `feat/<tema>`. Plantilla de PR en `.github/pull_request_template.md`.

## Seguridad y privacidad

No subir `.env`. La solución incluye controles iniciales, no una certificación de cumplimiento legal. Antes de producción deben revisarse el aviso y consentimiento de datos personales, retención, respaldo, TLS, rotación/revocación de sesiones, controles de acceso y seguridad.
