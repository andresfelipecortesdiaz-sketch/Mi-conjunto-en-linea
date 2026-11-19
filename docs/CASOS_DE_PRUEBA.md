# Casos de prueba

Estos son los casos planeados. Ya ejecuté las tres pruebas unitarias de reglas y comprobé manualmente el inicio de sesión de administradora y el catálogo desde SQLite: respondió con 3 torres, 240 apartamentos y 2 zonas. Los demás casos siguen pendientes de automatización.

| Área | Caso | Resultado esperado |
|---|---|---|
| Auth | Correo/clave válida | Cookie HttpOnly y perfil de rol — comprobación manual completada para administradora |
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
| Reporte | Mes elegido y descarga CSV | Conteos y CSV desde la base SQLite |

Faltan pruebas automatizadas unitarias, de integración y Playwright para materializar estos casos.
