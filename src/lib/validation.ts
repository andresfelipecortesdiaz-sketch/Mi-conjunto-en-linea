import { z } from "zod";
export const packageSchema = z.object({ apartmentId: z.string().min(1), recipientName: z.string().min(2).max(100), carrier: z.string().min(2).max(80), trackingNumber: z.string().max(100).optional(), description: z.string().max(500).optional(), observations: z.string().max(1000).optional() });
export const deliverySchema = z.object({ receiverName: z.string().min(2).max(100), observations: z.string().max(1000).optional() });
export const reservationSchema = z.object({ commonAreaId: z.string().min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), slot: z.string().min(1), attendees: z.number().int().positive() });
export const pqrsSchema = z.object({ kind: z.enum(["PETICION", "QUEJA", "RECLAMO", "SUGERENCIA"]), subject: z.string().min(4).max(140), description: z.string().min(10).max(5000) });
export const noveltySchema = z.object({ category: z.string().min(2).max(80), description: z.string().min(5).max(2000), shift: z.string().min(2).max(80), priority: z.enum(["BAJA", "MEDIA", "ALTA", "URGENTE"]), followUp: z.boolean() });
