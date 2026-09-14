import { z } from "zod";
export declare const createConsultationSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    motifConsultation: z.ZodString;
    observation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    prochainRdvDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    prochainRdvHeure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    acte: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        numeroDent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        nomActe: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        prix: z.ZodNumber;
    }, z.core.$strip>>>;
    actes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        numeroDent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        nomActe: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        prix: z.ZodNumber;
    }, z.core.$strip>>>;
    paiement: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        montant: z.ZodNumber;
        modePaiement: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
//# sourceMappingURL=consultation.validation.d.ts.map