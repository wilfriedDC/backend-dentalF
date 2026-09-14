import { z } from "zod";
export declare const createPaiementSchema: z.ZodObject<{
    consultationId: z.ZodNumber;
    montant: z.ZodNumber;
    modePaiement: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=paiement.validation.d.ts.map