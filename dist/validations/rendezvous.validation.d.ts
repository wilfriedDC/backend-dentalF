import { z } from "zod";
export declare const createRendezVousSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    date: z.ZodString;
    heure: z.ZodString;
    motif: z.ZodOptional<z.ZodString>;
    statut: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=rendezvous.validation.d.ts.map