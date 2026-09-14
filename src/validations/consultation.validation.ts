import { z } from "zod";

// Schéma d'un acte individuel, factorisé pour être réutilisé aussi bien en
// singulier (`acte`, rétrocompatibilité) qu'en tableau (`actes`, nouveau
// panier multi-actes).
const acteSchema = z.object({
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
});

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

  // Rétrocompatibilité : un seul acte envoyé directement.
  acte: acteSchema
    .nullable()
    .optional(),

  // Nouveau : plusieurs actes en une seule consultation (panier).
  actes: z
    .array(acteSchema)
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