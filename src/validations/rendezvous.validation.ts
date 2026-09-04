import { z } from "zod";

export const createRendezVousSchema = z.object({
  patientId: z.number().int().positive(),

  date: z.string().min(1),

  heure: z
    .string()
    .min(1, "L'heure est obligatoire"),

  motif: z.string().optional(),

  statut: z
    .string()
    .optional(),
});