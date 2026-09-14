"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaiement = exports.updatePaiement = exports.getPaiementById = exports.getPaiementsByConsultation = exports.getPaiements = exports.createPaiement = void 0;
const prisma_1 = require("../database/prisma");
// CREATE
const createPaiement = async (data) => {
    return await prisma_1.prisma.paiement.create({
        data,
    });
};
exports.createPaiement = createPaiement;
// GET ALL
const getPaiements = async () => {
    return await prisma_1.prisma.paiement.findMany({
        include: {
            consultation: true,
        },
        orderBy: {
            datePaiement: "desc",
        },
    });
};
exports.getPaiements = getPaiements;
// GET BY CONSULTATION
const getPaiementsByConsultation = async (consultationId) => {
    return await prisma_1.prisma.paiement.findMany({
        where: {
            consultationId,
        },
        orderBy: {
            datePaiement: "desc",
        },
    });
};
exports.getPaiementsByConsultation = getPaiementsByConsultation;
// GET ONE
const getPaiementById = async (id) => {
    return await prisma_1.prisma.paiement.findUnique({
        where: {
            id,
        },
    });
};
exports.getPaiementById = getPaiementById;
// UPDATE
const updatePaiement = async (id, data) => {
    return await prisma_1.prisma.paiement.update({
        where: {
            id,
        },
        data,
    });
};
exports.updatePaiement = updatePaiement;
// DELETE
const deletePaiement = async (id) => {
    return await prisma_1.prisma.paiement.delete({
        where: {
            id,
        },
    });
};
exports.deletePaiement = deletePaiement;
