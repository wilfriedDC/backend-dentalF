"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRendezVous = exports.updateRendezVous = exports.getRendezVousById = exports.getRendezVous = exports.createRendezVous = void 0;
const prisma_1 = require("../database/prisma");
const createRendezVous = async (data) => {
    return await prisma_1.prisma.rendezVous.create({
        data: {
            patientId: data.patientId,
            date: new Date(data.date),
            heure: data.heure,
            motif: data.motif,
            statut: data.statut,
        },
        include: {
            patient: true,
        },
    });
};
exports.createRendezVous = createRendezVous;
const getRendezVous = async () => {
    return await prisma_1.prisma.rendezVous.findMany({
        include: {
            patient: true,
        },
        orderBy: {
            date: "asc",
        },
    });
};
exports.getRendezVous = getRendezVous;
const getRendezVousById = async (id) => {
    return await prisma_1.prisma.rendezVous.findUnique({
        where: { id },
        include: {
            patient: true,
        },
    });
};
exports.getRendezVousById = getRendezVousById;
const updateRendezVous = async (id, data) => {
    return await prisma_1.prisma.rendezVous.update({
        where: { id },
        data: {
            date: data.date
                ? new Date(data.date)
                : undefined,
            heure: data.heure,
            motif: data.motif,
            statut: data.statut,
        },
        include: {
            patient: true,
        },
    });
};
exports.updateRendezVous = updateRendezVous;
const deleteRendezVous = async (id) => {
    return await prisma_1.prisma.rendezVous.delete({
        where: { id },
    });
};
exports.deleteRendezVous = deleteRendezVous;
