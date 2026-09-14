"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOdontogramme = exports.updateOdontogramme = exports.getById = exports.upsertToothForConsultation = exports.getByPatient = exports.getByConsultation = exports.createOdontogramme = void 0;
const prisma_1 = require("../database/prisma");
// CREATE
const createOdontogramme = async (data) => {
    return await prisma_1.prisma.odontogramme.create({
        data,
    });
};
exports.createOdontogramme = createOdontogramme;
// GET BY CONSULTATION
const getByConsultation = async (consultationId) => {
    return await prisma_1.prisma.odontogramme.findMany({
        where: {
            consultationId,
        },
        orderBy: {
            numeroDent: "asc",
        },
    });
};
exports.getByConsultation = getByConsultation;
// GET BY PATIENT (état actuel agrégé) — pour chaque dent, on ne garde que la
// ligne la plus récente parmi TOUTES les consultations du patient. C'est ce
// qui alimente l'affichage du schéma dentaire sur la fiche patient.
const getByPatient = async (patientId) => {
    const consultations = await prisma_1.prisma.consultation.findMany({
        where: { patientId },
        select: { id: true },
    });
    const consultationIds = consultations.map((c) => c.id);
    if (consultationIds.length === 0)
        return [];
    const entries = await prisma_1.prisma.odontogramme.findMany({
        where: { consultationId: { in: consultationIds } },
        orderBy: { updatedAt: "desc" },
    });
    // On ne garde que la première occurrence rencontrée par dent (donc la plus
    // récente, grâce au tri ci-dessus).
    const latestByTooth = new Map();
    for (const entry of entries) {
        if (!latestByTooth.has(entry.numeroDent)) {
            latestByTooth.set(entry.numeroDent, entry);
        }
    }
    return Array.from(latestByTooth.values());
};
exports.getByPatient = getByPatient;
// UPSERT pour une dent, rattachée à une consultation précise du patient.
// Une seule ligne par (consultationId, numeroDent) grâce à la contrainte
// unique ajoutée au schéma — un second appel sur la même dent/consultation
// met simplement à jour la ligne existante au lieu d'en créer une nouvelle.
const upsertToothForConsultation = async (data) => {
    return await prisma_1.prisma.odontogramme.upsert({
        where: {
            consultationId_numeroDent: {
                consultationId: data.consultationId,
                numeroDent: data.numeroDent,
            },
        },
        update: {
            statut: data.statut,
            commentaire: data.commentaire,
        },
        create: {
            consultationId: data.consultationId,
            numeroDent: data.numeroDent,
            statut: data.statut,
            commentaire: data.commentaire,
        },
    });
};
exports.upsertToothForConsultation = upsertToothForConsultation;
// GET ONE
const getById = async (id) => {
    return await prisma_1.prisma.odontogramme.findUnique({
        where: {
            id,
        },
    });
};
exports.getById = getById;
// UPDATE
const updateOdontogramme = async (id, data) => {
    return await prisma_1.prisma.odontogramme.update({
        where: {
            id,
        },
        data,
    });
};
exports.updateOdontogramme = updateOdontogramme;
// DELETE
const deleteOdontogramme = async (id) => {
    return await prisma_1.prisma.odontogramme.delete({
        where: {
            id,
        },
    });
};
exports.deleteOdontogramme = deleteOdontogramme;
