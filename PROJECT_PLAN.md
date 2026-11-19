# Plan del proyecto

## Propósito

En este proyecto estoy desarrollando **Mi Conjunto en Línea** para el Caso B de la asignatura Metodología de Software Colaborativo. La aplicación busca ayudar a Altos del Parque a organizar el registro y entrega de paquetes, las reservas de zonas comunes, las PQRS y las novedades de portería.

El conjunto que tomo como referencia tiene tres torres y 240 apartamentos. Mi objetivo es que cada rol pueda consultar y realizar únicamente las tareas que le corresponden, y que la información quede guardada en PostgreSQL.

## Avance por fases

Estoy siguiendo las fases del encargo original. Marco como parcial cualquier etapa cuyo código preparé, pero que aún no he podido validar con la base de datos.

| Fase | Trabajo previsto | Avance |
|---|---|---|
| 1. Inspección y arquitectura | Revisar la carpeta inicial y definir la estructura de la aplicación. | **Completada.** La carpeta estaba vacía; preparé el esqueleto del proyecto. |
| 2. Next.js, TypeScript y estilos | Preparar la aplicación web y la interfaz adaptable. | **Completada a nivel de compilación.** Las dependencias están instaladas y el build pasa. |
| 3. PostgreSQL y Prisma | Configurar el acceso a datos. | **Parcial.** El esquema está definido, pero no hay una instancia PostgreSQL disponible para conectar. |
| 4. Modelos y migraciones | Crear entidades, relaciones, índices y migración inicial. | **Parcial.** Escribí el esquema y el archivo de migración; aún no he podido aplicarlo a una base real. |
| 5. Sesiones y permisos | Implementar acceso por rol y proteger las rutas. | **Parcial.** Preparé las sesiones y los controles del servidor; falta probarlos con usuarios en PostgreSQL. |
| 6. Interfaz y dashboards | Construir navegación y vistas para cada rol. | **Parcial.** La interfaz principal está implementada y compila; faltan algunas pantallas administrativas. |
| 7. Paquetería | Registrar paquetes, consultarlos y registrar entregas. | **Parcial.** Preparé rutas y vistas; falta validar el flujo conectado a la base. |
| 8. Reservas | Solicitar, aprobar o rechazar reservas y aplicar reglas de disponibilidad. | **Parcial.** Las validaciones están en el servidor y hay una restricción en la migración; falta aplicarla y probar concurrencia. |
| 9. PQRS | Radicar solicitudes y mantener su historial. | **Parcial.** Preparé las rutas y vistas; falta comprobar la persistencia y el flujo completo. |
| 10. Bitácora | Registrar novedades de turno y gestionar seguimientos. | **Parcial.** Preparé las rutas y la vista; falta validar con la base conectada. |
| 11. Reportes | Consultar métricas reales y exportar CSV. | **Parcial.** El endpoint está escrito para consultar PostgreSQL; falta ejecutarlo con datos. |
| 12. Importación | Importar residentes y apartamentos desde CSV con validación previa. | **Pendiente.** |
| 13. Pruebas | Ejecutar pruebas unitarias, de integración y E2E. | **Parcial.** Pasan tres pruebas unitarias. Faltan pruebas de integración y E2E; no hay PostgreSQL disponible. |
| 14. Correcciones | Resolver los errores encontrados al validar el sistema. | **Parcial.** Corregí los errores encontrados en esquema, tipos, lint y build. Queda pendiente corregir lo que aparezca al probar contra PostgreSQL. |
| 15. Documentación | Explicar arquitectura, datos, reglas, uso y trazabilidad. | **Parcial.** Preparé el README y los documentos de `docs/`; se deben actualizar cuando avance la validación. |
| 16. Versión estable | Verificar una versión completa y lista para presentar o desplegar. | **Pendiente.** El build pasa, pero aún falta migrar, cargar datos, probar los flujos completos y completar módulos pendientes. |

## Qué necesito para continuar

1. Tener PostgreSQL instalado o una instancia administrada disponible.
2. Configurar `DATABASE_URL` y `SESSION_SECRET` en un archivo `.env` local.
3. Aplicar la migración con `npm.cmd run db:migrate` y cargar los datos de desarrollo con `npm.cmd run db:seed`.
4. Probar los recorridos de administración, portería y residencia con datos persistidos.
5. Añadir pruebas de integración y E2E, corregir los errores encontrados y volver a generar el build.
6. Completar la importación CSV y las herramientas de administración pendientes.

## Dependencias y decisiones pendientes

- En este entorno no se encontró PostgreSQL ni Docker, así que no pude aplicar la migración ni ejecutar el seed.
- El acceso a npm ya permitió instalar las dependencias. La auditoría sigue reportando alertas altas en Prisma CLI y `deepmerge-ts`; la solución automática que propone npm requiere pasar a Prisma 7, lo que tendría que hacerse como una actualización mayor y probarse por separado.
- El encargo menciona CON-01, CON-02, CON-10, CON-14 y RN-B6, pero no describe su alcance. Necesito la definición original para incorporarlos sin inventar requisitos.

## Cómo sigo el avance

Anoto las fases, las historias y las verificaciones reales en [docs/TRAZABILIDAD.md](docs/TRAZABILIDAD.md). Los casos que todavía no he ejecutado están identificados como pendientes en [docs/CASOS_DE_PRUEBA.md](docs/CASOS_DE_PRUEBA.md).
