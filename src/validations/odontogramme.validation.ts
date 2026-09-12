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

// Utilisé par PUT /patients/:id/odontogramme/:numeroDent — le numéro de dent
// vient de l'URL (req.params), donc ce schéma ne valide que le corps envoyé.
export const upsertToothForPatientSchema = z.object({
  consultationId: z
    .number()
    .int()
    .positive("Veuillez sélectionner une consultation."),

  statut: z
    .string()
    .min(1, "Le statut est obligatoire"),

  commentaire: z
    .string()
    .optional(),
});