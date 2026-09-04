import { z } from "zod";

export const createOdontogrammeSchema = z.object({
  consultationId: z
    .number()
    .int()
    .positive(),

  numeroDent: z
    .string()
    .min(1, "Le numéro de dent est obligatoire"),

  statut: z
    .string()
    .min(1, "Le statut est obligatoire"),

  face: z
    .string()
    .optional(),

  commentaire: z
    .string()
    .optional(),
});