import { z } from "zod";
export declare const createPatientSchema: z.ZodObject<{
    nom: z.ZodString;
    prenom: z.ZodString;
    sexe: z.ZodOptional<z.ZodString>;
    dateNaissance: z.ZodOptional<z.ZodString>;
    adresse: z.ZodOptional<z.ZodString>;
    telephone: z.ZodString;
    email: z.ZodOptional<z.ZodEmail>;
}, z.core.$strip>;
//# sourceMappingURL=patient.validation.d.ts.map