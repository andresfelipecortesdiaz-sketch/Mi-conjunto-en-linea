# Trazabilidad de Mi Conjunto en Línea

Bitácora del trabajo ejecutado en esta carpeta. No se registran commits, reuniones ni aprobaciones no realizadas. Estado verificado al 19/11/2026.

| Paso | Trabajo | Archivos / evidencia | Estado |
|---|---|---|---|
| 1 | Inspección de carpeta, runtime, Git y servicios | carpeta inicialmente vacía; Node 24.15.0; no se encontró PostgreSQL ni Docker. Repositorio Git inicializado en `main`, sin commits | Hecho |
| 2 | Inicialización de estructura Next.js/TypeScript | `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs` | Hecho; dependencias instaladas, lint, tipos y build verificados |
| 3 | Modelo relacional y base local | `prisma/schema.prisma`, `prisma/migrations/20261119120000_init_sqlite/` | Migración SQLite aplicada a `prisma/dev.db`; Prisma valida el esquema |
| 4 | Usuarios demo y conjuntos residenciales | `prisma/seed.mjs` (3 torres, 240 apartamentos, 2 áreas, 3 cuentas) | Seed ejecutado; registro idempotente |
| 5 | Sesiones y permisos | `src/lib/session.ts`; rutas `/api/auth/*`; formulario de acceso en `src/app/page.tsx` | Login admin y sesión verificados vía HTTP; catálogo devolvió 3 torres, 240 apartamentos y 2 zonas |
| 6 | Panel responsive | `src/app/page.tsx`, `src/app/globals.css` | Implementación escrita |
| 7 | Paquetería y entregas | `/api/packages`, `/api/packages/[id]/deliver` | Implementado en código; aún falta probar registro y entrega sobre la DB |
| 8 | Reservas | `/api/reservations*` | Validaciones de anticipación, capacidad, mensualidad y franja en servidor; índice parcial único de aprobación. Sin prueba concurrente ejecutada |
| 9 | PQRS | `/api/pqrs*` | Radicado, acceso por usuario e historial implementados; aún sin recorrido probado |
| 10 | Novedades de turno | `/api/novelties*` | Registro, consulta y seguimiento implementados; aún sin recorrido probado |
| 11 | Dashboard y CSV | `/api/dashboard`, `/api/reports` | Consultas para SQLite implementadas; falta validar conteos y descarga |
| 12 | Importación CSV | — | Pendiente |
| 13 | Plan de pruebas y unitarias de reglas | `docs/CASOS_DE_PRUEBA.md`, `src/lib/business.test.ts` | 3 unitarias ejecutadas y aprobadas; integración/E2E pendientes |
| 14 | Correcciones basadas en ejecución | — | Corregidos errores reproducidos de Prisma, tipos, lint, contraseña visible y errores de login; pendiente validar los demás flujos |
| 15 | Documentación | archivos de `docs/`, README | Documentación principal preparada; mantenerla sincronizada con la validación |
| 16 | Versión estable v1.0 | — | Pendiente de pruebas completas, historias faltantes y decidir si la entrega migra a PostgreSQL |

## Historias de usuario CON-01 a CON-14

La descripción detallada de CON-01, CON-02, CON-10, CON-11 y CON-14 no fue especificada en la solicitud fuente; se evita atribuirles alcance inventado.

| Historia | Estado | Evidencia / pendiente |
|---|---|---|
| CON-01 | Pendiente | Alcance no descrito; gestión completa de usuarios/residentes pendiente |
| CON-02 | Pendiente | Alcance no descrito; gestión de torres y apartamentos en interfaz pendiente |
| CON-03 | Parcial | Registro de paquetes con rol en API y formulario; falta probar el caso funcional con datos |
| CON-04 | Parcial | Consulta y filtro base por rol; filtros de fecha/torre detallados pendientes |
| CON-05 | Parcial | Registro transaccional de entrega con identidad validada; formulario usa nombre ingresado |
| CON-06 | Parcial | Solicitud, 48h, capacidad, franja y máximo mensual en API |
| CON-07 | Parcial | Decisión administrativa con motivo e índice de exclusión de doble aprobación |
| CON-08 | Parcial | Creación de PQRS y radicado único; falta probar el recorrido |
| CON-09 | Parcial | Historial administrativo e aislamiento residente |
| CON-10 | Pendiente | Alcance no descrito en solicitud fuente |
| CON-11 | Parcial | Dashboard de conteos reales; gráficos y filtros detallados pendientes |
| CON-12 | Parcial | Reporte mensual y CSV real definidos |
| CON-13 | Pendiente | Importación CSV con previsualización y reporte de errores pendiente |
| CON-14 | Pendiente | Alcance no descrito en solicitud fuente |

## Reglas RN-B1 a RN-B7

| Regla | Estado | Aplicación |
|---|---|---|
| RN-B1 No duplicar reservas aprobadas | Parcial | Transacción serializable e índice único parcial en SQLite. Falta probar carreras concurrentes |
| RN-B2 48 horas de anticipación | Parcial | Validación en API de creación |
| RN-B3 Una reserva mensual por apartamento | Parcial | Búsqueda transaccional en API para estados pendiente/aprobada. Probar bajo concurrencia |
| RN-B4 Entregar solo a residente/autorizado | Parcial | API coteja persona con residente o lista AuthorizedPerson; UI no administra autorizados |
| RN-B5 Marcar paquetes con más de 15 días | Parcial | Cálculo de dashboard y resaltado en tabla |
| RN-B6 | Pendiente de definición | La solicitud menciona siete reglas pero no especifica RN-B6 |
| RN-B7 Protección de datos | Parcial | Cookies HttpOnly, hash bcrypt, roles y auditoría parcial; aviso/consentimiento, revisión legal y pruebas de seguridad pendientes |

## Registro de limitaciones

- Primera instalación falló por EACCES; una instalación autorizada posterior se completó. `npm audit` deja tres alertas altas en Prisma CLI/deepmerge-ts, corregibles por npm solo con el salto mayor a Prisma 7; Next/PostCSS se actualizó con override compatible.
- No había PostgreSQL ni Docker disponibles, por eso se adaptó la base local a SQLite. El requerimiento original de PostgreSQL todavía queda pendiente para una entrega que deba cumplir literalmente esa tecnología.
- En este entorno Prisma 6 necesitó `RUST_LOG=info` para aplicar la migración SQLite; ese ajuste está en `.env.example`.
- Verificaciones ejecutadas: `npx prisma validate`, migración SQLite, seed, login HTTP de administradora, lectura del catálogo, `npx tsc --noEmit`, `npm run lint`, `npm test` (3/3) y `npm run build`.
- El repositorio Git se inicializó en `main`; no se creó ningún commit.
