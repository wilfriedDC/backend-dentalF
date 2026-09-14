"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatient = exports.deletePatient = exports.getPatientById = exports.getPatients = exports.createPatient = void 0;
const prisma_1 = require("../database/prisma");
// =====================================================
// CREATE PATIENT
// =====================================================
const createPatient = async (data) => {
    return await prisma_1.prisma.patient.create({
        data: {
            nom: data.nom,
            prenom: data.prenom,
            sexe: data.sexe ?? null,
            telephone: data.telephone,
            email: data.email ?? null,
            adresse: data.adresse ?? null,
            dateNaissance: data.dateNaissance
                ? new Date(data.dateNaissance)
                : null,
        },
    });
};
exports.createPatient = createPatient;
// =====================================================
// GET TOUS LES PATIENTS
// =====================================================
const getPatients = async (search) => {
    return await prisma_1.prisma.patient.findMany({
        where: search
            ? {
                OR: [
                    {
                        nom: {
                            contains: search,
                        },
                    },
                    {
                        prenom: {
                            contains: search,
                        },
                    },
                    {
                        telephone: {
                            contains: search,
                        },
                    },
                ],
            }
            : undefined,
        include: {
            consultations: {
                include: {
                    actes: true,
                    paiements: true,
                    facture: true,
                },
            },
            rendezVous: true,
        },
        orderBy: {
            nom: "asc",
        },
    });
};
exports.getPatients = getPatients;
// =====================================================
// GET UN PATIENT PAR ID
// =====================================================
const getPatientById = async (id) => {
    return await prisma_1.prisma.patient.findUnique({
        where: {
            id,
        },
        include: {
            // -------------------------
            // CONSULTATIONS
            // -------------------------
            consultations: {
                include: {
                    actes: true,
                    paiements: true,
                    facture: true,
                },
                orderBy: {
                    dateConsultation: "desc",
                },
            },
            // -------------------------
            // RENDEZ-VOUS
            // -------------------------
            rendezVous: {
                orderBy: {
                    date: "desc",
                },
            },
        },
    });
};
exports.getPatientById = getPatientById;
// =====================================================
// DELETE PATIENT
// =====================================================
const deletePatient = async (id) => {
    return await prisma_1.prisma.patient.delete({
        where: {
            id,
        },
    });
};
exports.deletePatient = deletePatient;
// =====================================================
// UPDATE PATIENT
// =====================================================
const updatePatient = async (id, data) => {
    return await prisma_1.prisma.patient.update({
        where: {
            id,
        },
        data: {
            nom: data.nom,
            prenom: data.prenom,
            sexe: data.sexe,
            adresse: data.adresse,
            telephone: data.telephone,
            email: data.email,
            dateNaissance: data.dateNaissance
                ? new Date(data.dateNaissance)
                : undefined,
        },
    });
};
exports.updatePatient = updatePatient;
