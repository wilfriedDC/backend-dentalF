"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActeSchema = void 0;
const zod_1 = require("zod");
exports.createActeSchema = zod_1.z.object({
    consultationId: zod_1.z.number().int().positive(),
    numeroDent: zod_1.z
        .string()
        .optional(),
    nomActe: zod_1.z
        .string()
        .min(2, "Le nom de l'acte est obligatoire"),
    description: zod_1.z
        .string()
        .optional(),
    prix: zod_1.z
        .number()
        .nonnegative("Le prix ne peut pas être négatif"),
});
