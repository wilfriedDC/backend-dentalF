import { z } from "zod";
export declare const createActeSchema: z.ZodObject<{
    consultationId: z.ZodNumber;
    numeroDent: z.ZodOptional<z.ZodString>;
    nomActe: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    prix: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=acte.validation.d.ts.map