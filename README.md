# Mi Conjunto en Línea

## Sobre el proyecto

Desarrollé este proyecto para el Caso B de la asignatura Metodología de Software Colaborativo de la Universidad Cooperativa de Colombia. La propuesta está pensada para Altos del Parque, un conjunto residencial de tres torres y 240 apartamentos.

La idea es reunir en un solo lugar tareas que hoy pueden quedar repartidas entre cuadernos, mensajes y correos: registrar paquetes, organizar reservas de zonas comunes, hacer seguimiento a las PQRS y dejar novedades entre turnos de portería.

**Eslogan:** “Que ningún paquete se pierda y ninguna reserva se cruce”.

## Tecnologías

Para construir la aplicación estoy usando:

- Next.js y React para la aplicación web y sus rutas de servidor.
- TypeScript para definir los tipos del proyecto.
- Tailwind CSS para los estilos.
- SQLite como base local (un archivo) y Prisma como ORM. Para esta versión ya no hace falta instalar un servidor de base de datos.
- Zod para validar los datos que recibe el servidor.
- bcryptjs para guardar contraseñas como hashes.
- Vitest para las pruebas unitarias iniciales.

## Qué incluye

En el código preparé estos módulos:

- **Acceso por roles:** administradora, portero y residente, con sesión en cookie HTTP-only y permisos verificados en las rutas del servidor.
- **Paquetería:** registro y consulta de paquetes, y registro de entregas a residentes o personas autorizadas.
- **Reservas:** solicitud y gestión de espacios comunes, con validaciones de anticipación, capacidad, horario y solicitudes mensuales.
- **PQRS:** radicación con número de seguimiento e historial de cambios.
- **Bitácora:** registro de novedades de turno y seguimiento administrativo.
- **Dashboard y reportes:** conteos consultados desde la base de datos y exportación mensual a CSV.

También preparé un seed de desarrollo con tres torres, los 240 apartamentos, el salón social, la zona BBQ y una cuenta para cada rol.

## Estado actual

La aplicación usa SQLite mediante Prisma y guarda los datos localmente en `prisma/dev.db`. Ya apliqué la migración y ejecuté el seed con las tres torres, los 240 apartamentos, las dos zonas comunes y las cuentas de demostración. Comprobé el inicio de sesión de la administradora y la consulta del catálogo: la respuesta incluyó 3 torres, 240 apartamentos y 2 zonas comunes.

La interfaz y las rutas principales de paquetería, reservas, PQRS, bitácora y reportes están implementadas. También pasan la comprobación de TypeScript, lint, las tres pruebas unitarias y la compilación de producción. Todavía falta probar de extremo a extremo todos los recorridos; la importación CSV y algunas pantallas administrativas siguen pendientes. Registro el detalle de lo implementado y probado en la [trazabilidad del proyecto](docs/TRAZABILIDAD.md).

## Requisitos

- Node.js 20 o posterior.
- npm.
- Acceso al registro de npm para instalar las dependencias.

## Instalación y ejecución

Desde la carpeta del proyecto, copia el archivo de variables de entorno:

```powershell
Copy-Item .env.example .env
```

La configuración usa el archivo local `prisma/dev.db`; la migración lo crea por ti. En `.env`, cambia `SESSION_SECRET` por un valor aleatorio de al menos 32 caracteres. No compartas ni subas `.env` al repositorio.

Luego instala las dependencias, crea las tablas, carga los datos de demostración e inicia la aplicación:

```powershell
npm.cmd install
npm.cmd run db:migrate
npm.cmd run db:seed
npm.cmd run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Cuentas de demostración

El seed crea estas cuentas para desarrollo. Las tres usan la contraseña `AltosDemo2026!`:

| Rol | Correo | Ubicación |
|---|---|---|
| Administradora | `admin@altos.test` | — |
| Portero | `porter@altos.test` | — |
| Residente | `resident@altos.test` | Torre 1, apartamento 101 |

Las contraseñas se guardan como hashes bcrypt. Estas cuentas son solo para demostración: cámbialas o elimínalas antes de cualquier despliegue y nunca uses esas credenciales en producción.

## Comandos útiles

| Comando | Para qué lo uso |
|---|---|
| `npm.cmd run dev` | Iniciar el servidor de desarrollo |
| `npm.cmd run build` | Generar la compilación de producción |
| `npm.cmd start` | Ejecutar la compilación de producción |
| `npm.cmd run db:generate` | Generar el cliente de Prisma |
| `npm.cmd run db:migrate` | Crear o actualizar la base local SQLite |
| `npm.cmd run db:seed` | Crear los datos de demostración |
| `npm.cmd test` | Ejecutar las pruebas unitarias disponibles |
| `npm.cmd run lint` | Revisar el estilo y errores comunes del código |

Uso `npm.cmd` en estos ejemplos porque es el comando compatible con la configuración de PowerShell de este entorno.

## Organización de carpetas

```text
src/app/                 páginas y rutas de la aplicación
src/lib/                 conexión a Prisma, sesiones y validaciones
prisma/schema.prisma     modelo de la base de datos
prisma/migrations/       migraciones de SQLite
prisma/seed.mjs          datos de demostración
docs/                    arquitectura, reglas, pruebas y trazabilidad
.github/                 plantilla para solicitudes de cambio
```

## Pruebas y seguridad

Las tres pruebas unitarias actuales cubren reglas básicas de anticipación de reservas, antigüedad de paquetes y límite mensual. Además, comprobé manualmente el login y el catálogo contra SQLite. Aún faltan pruebas automatizadas de integración y de extremo a extremo.

La aplicación incluye controles iniciales de roles, validación de datos y protección de contraseñas. Antes de usarla con información real, falta revisar el aviso y consentimiento para el tratamiento de datos personales, la política de retención, respaldos, TLS y la gestión de sesiones para producción. La auditoría de dependencias también reporta alertas en Prisma CLI y `deepmerge-ts`; la corrección automática propuesta implica pasar a Prisma 7, lo cual requiere una migración aparte.

## Trabajo en equipo y Git

Preparé el repositorio en la rama `main` y una plantilla para solicitudes de cambio en `.github/pull_request_template.md`. Para organizar el trabajo propongo usar ramas `feat/<tema>` y commits con prefijos como `feat:`, `fix:`, `docs:` y `test:`. No he agregado commits ni atribuido revisiones a otras personas.
