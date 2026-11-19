# Modelo de datos

Prisma define 13 entidades: `User`, `Tower`, `Apartment`, `ResidentProfile`, `Package`, `PackageDelivery`, `AuthorizedPerson`, `CommonArea`, `Reservation`, `PQRS`, `PQRSHistory`, `AuditLog`, `ShiftNovelty`.

- `Tower` 1:N `Apartment`; `Apartment` 1:N perfiles residentes, paquetes y reservas.
- `User` 1:0..1 `ResidentProfile`; perfiles enlazan apartamentos y personas autorizadas.
- `Package` 1:0..1 `PackageDelivery`; `PackageDelivery.packageId` es único para impedir entregas duplicadas.
- `CommonArea` 1:N reservas. Una reserva pertenece a usuario y apartamento.
- `PQRS` 1:N historial con estado, mensaje, autor y fecha.
- `AuditLog` conserva evento, entidad, usuario, fecha y metadata JSON.
- `ShiftNovelty` conserva autor, prioridad, turno y seguimiento.

Enums controlan rol, estados y prioridad. Índices cubren consultas por apartamento/estado/fecha, reserva/franja/estado, usuario/fecha y PQRS/estado. El índice parcial `Reservation_one_approved_slot` está en la migración SQL de PostgreSQL.

Para aplicar migraciones, configurar `DATABASE_URL` y ejecutar `npm run db:migrate`.
