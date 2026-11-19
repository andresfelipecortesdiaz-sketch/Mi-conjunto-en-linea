# Casos de prueba

Estos casos son el plan solicitado, no evidencia de ejecución. No se han ejecutado porque npm denegó acceso al registro y PostgreSQL no está disponible.

| Área | Caso | Resultado esperado |
|---|---|---|
| Auth | Correo/clave válida | Cookie HttpOnly y perfil de rol |
| Auth | Clave incorrecta | 401 sin crear sesión |
| Auth | Recurso sin sesión | 401 |
| Auth | Rol no autorizado | 403 |
| Paquetes | Portero registra paquete válido | Persistencia y auditoría |
| Paquetes | Residente lista paquetes | Solo apartamento vinculado |
| Entrega | Recibe residente/autorized | Estado ENTREGADO y autor guardado |
| Entrega | Entrega duplicada o persona extraña | Rechazo sin cambios |
| Reserva | Solicitud con 48h, aforo y franja válida | PENDIENTE |
| Reserva | Menos de 48h/exceso de aforo/franja inválida | 400 |
| Reserva | Apartamento ya solicitó en el mes | Rechazo |
| Reserva | Dos aprobaciones simultáneas misma franja | Solo una confirmada por índice único |
| PQRS | Crear y consultar | Radicado único e historial |
| PQRS | Residente consulta ticket ajeno | No aparece en lista |
| Reporte | Mes elegido y descarga CSV | Conteos y CSV desde PostgreSQL |

Faltan pruebas automatizadas unitarias, de integración y Playwright para materializar estos casos.
