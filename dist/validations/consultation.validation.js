"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsultationSchema = void 0;
const zod_1 = require("zod");
// Schéma d'un acte individuel, factorisé pour être réutilisé aussi bien en
// singulier (`acte`, rétrocompatibilité) qu'en tableau (`actes`, nouveau
// panier multi-actes).
const acteSchema = zod_1.z.object({
    numeroDent: zod_1.z
        .string()
        .nullable()
        .optional(),
    nomActe: zod_1.z
        .string()
        .min(1, "L'acte est obligatoire"),
    description: zod_1.z
        .string()
        .nullable()
        .optional(),
    prix: zod_1.z
        .number()
        .min(0),
});
exports.createConsultationSchema = zod_1.z.object({
    patientId: zod_1.z.number(),
    motifConsultation: zod_1.z
        .string()
        .min(1, "Le motif de consultation est obligatoire"),
    observation: zod_1.z
        .string()
        .nullable()
        .optional(),
    prochainRdvDate: zod_1.z
        .string()
        .nullable()
        .optional(),
    prochainRdvHeure: zod_1.z
        .string()
        .nullable()
        .optional(),
    // Rétrocompatibilité : un seul acte envoyé directement.
    acte: acteSchema
        .nullable()
        .optional(),
    // Nouveau : plusieurs actes en une seule consultation (panier).
    actes: zod_1.z
        .array(acteSchema)
        .optional(),
    paiement: zod_1.z
        .object({
        montant: zod_1.z
            .number()
            .min(0),
        modePaiement: zod_1.z
            .string()
            .nullable()
            .optional(),
    })
        .nullable()
        .optional(),
});
