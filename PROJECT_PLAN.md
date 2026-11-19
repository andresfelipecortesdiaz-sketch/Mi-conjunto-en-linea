# Plan del proyecto

## Objetivo
Desarrollar la aplicación web de administración residencial para Altos del Parque según el alcance fuente del Caso B.

## Fases y estado

| Fase | Resultado esperado | Estado actual |
|---|---|---|
| 1. Inspección y arquitectura | Inventario y estructura | Hecha; carpeta vacía |
| 2. Next.js, TypeScript, Tailwind | Aplicación compilable | Archivos preparados; dependencias bloqueadas |
| 3. PostgreSQL y Prisma | Configuración ORM | Esquema preparado; instancia no disponible |
| 4. Modelos y migración | Entidades y relaciones | SQL/schema creados; no aplicados |
| 5. Sesiones y permisos | Login, roles y aislamiento | Rutas escritas; sin pruebas de ejecución |
| 6. UI base | Layout adaptable | Panel básico escrito |
| 7. Paquetería | Registro, consulta, entrega | APIs y vistas escritas |
| 8. Reservas | Solicitud y decisión | APIs, validación y restricción parcial preparadas |
| 9. PQRS | Radicado e historial | APIs y vistas escritas |
| 10. Bitácora | Novedades de turnos | APIs y vista escritas |
| 11. Reportes | Consultas y CSV | Endpoint escrito |
| 12. Importación | CSV con validación y previsualización | Pendiente |
| 13. Pruebas integrales | Unitarias, integración y E2E | Pendiente: dependencias no instaladas |
| 14. Correcciones | Resolver errores reproducidos | Pendiente |
| 15. Documentación | Manual y arquitectura | Parcial; ver `docs/` |
| 16. Versión estable | Deploy/build validado | Pendiente |

## Riesgos y dependencias externas

- PostgreSQL local o administrado y `DATABASE_URL` funcional.
- Acceso al registro npm para instalar paquetes.
- Alcances ausentes de CON-01/02/10/14 y RN-B6 requieren aclaración de la especificación académica para completar su trazabilidad.

Consulta `docs/TRAZABILIDAD.md` para el estado detallado y los límites de verificación.
