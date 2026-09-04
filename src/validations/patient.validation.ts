import { z } from "zod";

export const createPatientSchema = z.object({
  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),

  sexe: z
    .string()
    .optional(),

  dateNaissance: z
    .string()
    .optional(),

  adresse: z
    .string()
    .optional(),

  telephone: z
    .string()
    .min(8, "Numéro de téléphone invalide"),

  email: z
    .email("Email invalide")
    .optional(),
});