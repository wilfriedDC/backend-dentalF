"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertToothForPatientSchema = exports.createOdontogrammeSchema = void 0;
const zod_1 = require("zod");
exports.createOdontogrammeSchema = zod_1.z.object({
    consultationId: zod_1.z
        .number()
        .int()
        .positive(),
    numeroDent: zod_1.z
        .string()
        .min(1, "Le numéro de dent est obligatoire"),
    statut: zod_1.z
        .string()
        .min(1, "Le statut est obligatoire"),
    face: zod_1.z
        .string()
        .optional(),
    commentaire: zod_1.z
        .string()
        .optional(),
});
// Utilisé par PUT /patients/:id/odontogramme/:numeroDent — le numéro de dent
// vient de l'URL (req.params), donc ce schéma ne valide que le corps envoyé.
exports.upsertToothForPatientSchema = zod_1.z.object({
    consultationId: zod_1.z
        .number()
        .int()
        .positive("Veuillez sélectionner une consultation."),
    statut: zod_1.z
        .string()
        .min(1, "Le statut est obligatoire"),
    commentaire: zod_1.z
        .string()
        .optional(),
});
