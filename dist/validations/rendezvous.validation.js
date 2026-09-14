"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRendezVousSchema = void 0;
const zod_1 = require("zod");
exports.createRendezVousSchema = zod_1.z.object({
    patientId: zod_1.z.number().int().positive(),
    date: zod_1.z.string().min(1),
    heure: zod_1.z
        .string()
        .min(1, "L'heure est obligatoire"),
    motif: zod_1.z.string().optional(),
    statut: zod_1.z
        .string()
        .optional(),
});
