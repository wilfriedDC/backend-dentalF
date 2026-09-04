import { z } from "zod";

export const createActeSchema = z.object({
  consultationId: z.number().int().positive(),

  numeroDent: z
    .string()
    .optional(),

  nomActe: z
    .string()
    .min(2, "Le nom de l'acte est obligatoire"),

  description: z
    .string()
    .optional(),

  prix: z
    .number()
    .nonnegative("Le prix ne peut pas être négatif"),
});