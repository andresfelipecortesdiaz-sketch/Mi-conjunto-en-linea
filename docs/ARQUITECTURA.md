# Arquitectura

- **Presentación:** Next.js App Router, React y CSS adaptable. Las vistas consumen Route Handlers JSON.
- **Servidor:** Route Handlers con autenticación por cookie firmada HMAC, `HttpOnly`, `SameSite=Lax`, caducidad de 12 horas. Las rutas llaman `requireRole` antes de acceder a información.
- **Validación:** Zod valida cuerpos recibidos en servidor.
- **Persistencia:** Prisma ORM sobre PostgreSQL. Consultas por residencia llevan scope `userId` o apartmentId desde la sesión, nunca desde el body.
- **Auditoría:** `AuditLog` registra acciones de paquetes, reservas y PQRS.
- **Concurrencia:** operaciones de entrega y reserva usan transacción serializable. Una restricción parcial PostgreSQL impide aprobación duplicada de zona/fecha/franja.
- **Identidad:** bcryptjs con factor de costo 12 en seed. No almacenar secretos del entorno en Git.

## Estructura

```text
src/app/                 páginas y Route Handlers
src/lib/                 Prisma, sesión, errores y esquemas
prisma/schema.prisma     modelo relacional
prisma/migrations/       migración inicial
prisma/seed.ts           datos de desarrollo
docs/                    arquitectura, modelo, reglas y manual
```

## Límites actuales

La sesión usa un token HMAC autocontenido. No tiene revocación en servidor ni rotación de claves; para despliegue real se recomienda almacén de sesiones y gestión de claves. La importación CSV y administración de residentes no se implementaron todavía. Las operaciones requieren pruebas con PostgreSQL antes de considerarse validadas.
