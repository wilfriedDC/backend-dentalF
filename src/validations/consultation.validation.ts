import { z } from "zod";

export const createConsultationSchema = z.object({
  patientId: z.number().int().positive(),

  motifConsultation: z
    .string()
    .min(2, "Le motif est obligatoire"),

  observation: z
    .string()
    .optional(),

  prochainRdvDate: z
    .string()
    .optional(),

  prochainRdvHeure: z
    .string()
    .optional(),
});