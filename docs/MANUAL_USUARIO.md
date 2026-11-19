# Manual de usuario

## Inicio

1. Configure PostgreSQL local y cree la base `mi_conjunto`.
2. Copie `.env.example` a `.env` y configure `DATABASE_URL` y un `SESSION_SECRET` aleatorio de 32 caracteres o más.
3. Instale dependencias con `npm.cmd install`.
4. Ejecute `npm.cmd run db:migrate`, luego `npm.cmd run db:seed`.
5. Inicie con `npm.cmd run dev` y abra `http://localhost:3000`.

Las credenciales de demostración son solo para desarrollo; vea `README.md`.

## Portería

En Paquetería, registre los datos del paquete. Cuando lo reclamen, elija “Registrar entrega” y escriba el nombre completo del residente o persona autorizada. En Bitácora, registre turno, categoría, prioridad y seguimiento requerido.

## Residente

En Paquetería consulte sus paquetes. En Reservas seleccione zona, fecha, horario y asistentes (con al menos 48 horas). En PQRS radique el tipo, asunto y descripción; conserve el número de radicado.

## Administración

Revise el dashboard, apruebe o rechace reservas (el rechazo pide motivo), responda PQRS y gestione seguimiento de novedades. Reportes permite elegir mes y exportar CSV.

Esta versión sigue en desarrollo: migración y flujos descritos requieren instalación y validación de base de datos antes de uso operativo.
