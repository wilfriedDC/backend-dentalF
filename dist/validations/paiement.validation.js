"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaiementSchema = void 0;
const zod_1 = require("zod");
exports.createPaiementSchema = zod_1.z.object({
    consultationId: zod_1.z
        .number()
        .int()
        .positive(),
    montant: zod_1.z
        .number()
        .positive("Le montant doit être supérieur à 0"),
    modePaiement: zod_1.z
        .string()
        .optional(),
});
