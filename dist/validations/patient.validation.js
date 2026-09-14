"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientSchema = void 0;
const zod_1 = require("zod");
exports.createPatientSchema = zod_1.z.object({
    nom: zod_1.z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: zod_1.z
        .string()
        .min(2, "Le prénom doit contenir au moins 2 caractères"),
    sexe: zod_1.z
        .string()
        .optional(),
    dateNaissance: zod_1.z
        .string()
        .optional(),
    adresse: zod_1.z
        .string()
        .optional(),
    telephone: zod_1.z
        .string()
        .min(8, "Numéro de téléphone invalide"),
    email: zod_1.z
        .email("Email invalide")
        .optional(),
});
