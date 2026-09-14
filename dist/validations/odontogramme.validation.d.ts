import { z } from "zod";
export declare const createOdontogrammeSchema: z.ZodObject<{
    consultationId: z.ZodNumber;
    numeroDent: z.ZodString;
    statut: z.ZodString;
    face: z.ZodOptional<z.ZodString>;
    commentaire: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const upsertToothForPatientSchema: z.ZodObject<{
    consultationId: z.ZodNumber;
    statut: z.ZodString;
    commentaire: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=odontogramme.validation.d.ts.map