# Plan del proyecto

## Propósito

En este proyecto estoy desarrollando **Mi Conjunto en Línea** para el Caso B de la asignatura Metodología de Software Colaborativo. La aplicación busca ayudar a Altos del Parque a organizar el registro y entrega de paquetes, las reservas de zonas comunes, las PQRS y las novedades de portería.

El conjunto que tomo como referencia tiene tres torres y 240 apartamentos. Mi objetivo es que cada rol pueda consultar y realizar únicamente las tareas que le corresponden, y que la información quede guardada en una base de datos. Para poder probar el proyecto sin instalar un servidor, configuré SQLite como almacenamiento local. El enunciado original pide PostgreSQL, así que ese cambio debe tenerse en cuenta para la entrega final.

## Avance por fases

Estoy siguiendo las fases del encargo original. Marco como parcial cualquier etapa cuyo código preparé, pero que aún no he podido validar con la base de datos.

| Fase | Trabajo previsto | Avance |
|---|---|---|
| 1. Inspección y arquitectura | Revisar la carpeta inicial y definir la estructura de la aplicación. | **Completada.** La carpeta estaba vacía; preparé el esqueleto del proyecto. |
| 2. Next.js, TypeScript y estilos | Preparar la aplicación web y la interfaz adaptable. | **Completada a nivel de compilación.** Las dependencias están instaladas y el build pasa. |
| 3. Base de datos y Prisma | Configurar el acceso a datos. | **Completada para desarrollo local.** La aplicación usa SQLite en `prisma/dev.db`. |
| 4. Modelos y migraciones | Crear entidades, relaciones, índices y migración inicial. | **Completada para SQLite.** Apliqué la migración; la configuración PostgreSQL original está archivada como referencia. |
| 5. Sesiones y permisos | Implementar acceso por rol y proteger las rutas. | **Parcial.** Probé el inicio de sesión y la lectura del catálogo; faltan pruebas de acceso indebido y el resto de roles. |
| 6. Interfaz y dashboards | Construir navegación y vistas para cada rol. | **Parcial.** La interfaz principal está implementada y compila; faltan algunas pantallas administrativas. |
| 7. Paquetería | Registrar paquetes, consultarlos y registrar entregas. | **Parcial.** Preparé rutas y vistas; falta validar el flujo conectado a la base. |
| 8. Reservas | Solicitar, aprobar o rechazar reservas y aplicar reglas de disponibilidad. | **Parcial.** Las validaciones están en el servidor y hay una restricción en la migración; falta aplicarla y probar concurrencia. |
| 9. PQRS | Radicar solicitudes y mantener su historial. | **Parcial.** Preparé las rutas y vistas; falta comprobar la persistencia y el flujo completo. |
| 10. Bitácora | Registrar novedades de turno y gestionar seguimientos. | **Parcial.** Preparé las rutas y la vista; falta validar con la base conectada. |
| 11. Reportes | Consultar métricas reales y exportar CSV. | **Parcial.** El endpoint consulta a través de Prisma; falta probar los reportes con datos y filtros. |
| 12. Importación | Importar residentes y apartamentos desde CSV con validación previa. | **Pendiente.** |
| 13. Pruebas | Ejecutar pruebas unitarias, de integración y E2E. | **Parcial.** Pasan tres pruebas unitarias y comprobé manualmente login y catálogo sobre SQLite. Faltan pruebas automatizadas de integración y E2E. |
| 14. Correcciones | Resolver los errores encontrados al validar el sistema. | **Parcial.** Corregí errores de esquema, tipos, lint y build. Queda pendiente corregir lo que surja al probar los flujos completos. |
| 15. Documentación | Explicar arquitectura, datos, reglas, uso y trazabilidad. | **Parcial.** Preparé el README y los documentos de `docs/`; se deben actualizar cuando avance la validación. |
| 16. Versión estable | Verificar una versión completa y lista para presentar o desplegar. | **Pendiente.** El build pasa, pero aún falta migrar, cargar datos, probar los flujos completos y completar módulos pendientes. |

## Qué necesito para continuar

1. Probar los recorridos de administración, portería y residencia con los datos locales.
2. Añadir pruebas automatizadas de integración y E2E, corregir errores y volver a generar el build.
3. Completar la importación CSV y las herramientas de administración pendientes.
4. Si la evaluación requiere PostgreSQL, restaurar esa configuración y verificarla con un servidor PostgreSQL antes de presentar el proyecto.

## Dependencias y decisiones pendientes

- Elegí SQLite para facilitar la ejecución local. El proyecto original pide PostgreSQL, así que la versión de SQLite no cumple ese requisito técnico hasta que se complete la migración de proveedor.
- El acceso a npm ya permitió instalar las dependencias. La auditoría sigue reportando alertas altas en Prisma CLI y `deepmerge-ts`; la solución automática que propone npm requiere pasar a Prisma 7, lo que tendría que hacerse como una actualización mayor y probarse por separado.
- El encargo menciona CON-01, CON-02, CON-10, CON-14 y RN-B6, pero no describe su alcance. Necesito la definición original para incorporarlos sin inventar requisitos.

## Cómo sigo el avance

Anoto las fases, las historias y las verificaciones reales en [docs/TRAZABILIDAD.md](docs/TRAZABILIDAD.md). Los casos que todavía no he ejecutado están identificados como pendientes en [docs/CASOS_DE_PRUEBA.md](docs/CASOS_DE_PRUEBA.md).
