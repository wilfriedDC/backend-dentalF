import { z } from "zod";

export const createPaiementSchema = z.object({
  consultationId: z
    .number()
    .int()
    .positive(),

  montant: z
    .number()
    .positive("Le montant doit être supérieur à 0"),

  modePaiement: z
    .string()
    .optional(),
});