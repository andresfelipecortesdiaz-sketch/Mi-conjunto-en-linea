# Guion para sustentación

## Contexto

Altos del Parque gestiona 240 apartamentos en tres torres. La solución concentra paquetes, reservas de zonas comunes, PQRS y novedades de turnos.

## Recorrido sugerido

1. Iniciar sesión con cada rol de demo y explicar el control de acceso.
2. Como portero, registrar un paquete y entregar a residente autorizado.
3. Como residente, ver su paquete y solicitar una zona común respetando horario, capacidad y anticipación.
4. Como administración, aprobar o rechazar y explicar la restricción de concurrencia.
5. Radicar una PQRS, consultar el radicado y mostrar el historial.
6. Registrar una novedad entre turnos, completar seguimiento y descargar un reporte CSV.

## Evidencia

Para la demostración local, ejecutar la aplicación con SQLite y las cuentas de seed. Ya comprobé manualmente el login de administradora y que el catálogo devuelve 3 torres, 240 apartamentos y 2 zonas comunes. No presentar esos resultados como pruebas E2E: aún falta automatizar los recorridos completos. El enunciado original pide PostgreSQL, por lo que se debe explicar que SQLite se usa como alternativa de desarrollo si se conserva ese cambio.
