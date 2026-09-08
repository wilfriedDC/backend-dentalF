import { z } from "zod";

export const createConsultationSchema = z.object({
  patientId: z.number(),

  motifConsultation: z
    .string()
    .min(1, "Le motif de consultation est obligatoire"),

  observation: z
    .string()
    .nullable()
    .optional(),

  prochainRdvDate: z
    .string()
    .nullable()
    .optional(),

  prochainRdvHeure: z
    .string()
    .nullable()
    .optional(),

  acte: z
    .object({
      numeroDent: z
        .string()
        .nullable()
        .optional(),

      nomActe: z
        .string()
        .min(1, "L'acte est obligatoire"),

      description: z
        .string()
        .nullable()
        .optional(),

      prix: z
        .number()
        .min(0),
    })
    .nullable()
    .optional(),

  paiement: z
    .object({
      montant: z
        .number()
        .min(0),

      modePaiement: z
        .string()
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
});