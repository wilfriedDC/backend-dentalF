"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPraticien = exports.updatePraticien = exports.getPraticiens = exports.updateCabinet = exports.getCabinet = void 0;
const prisma_1 = require("../database/prisma");
// ==========================
// CABINET
// ==========================
const getCabinet = async () => {
    return await prisma_1.prisma.cabinet.findFirst({
        include: {
            praticiens: true,
        },
    });
};
exports.getCabinet = getCabinet;
const updateCabinet = async (data) => {
    const cabinet = await prisma_1.prisma.cabinet.findFirst();
    if (!cabinet) {
        return await prisma_1.prisma.cabinet.create({
            data: {
                nom: data.nom,
                adresse: data.adresse,
                telephone: data.telephone,
                email: data.email,
            },
        });
    }
    return await prisma_1.prisma.cabinet.update({
        where: {
            id: cabinet.id,
        },
        data: {
            nom: data.nom,
            adresse: data.adresse,
            telephone: data.telephone,
            email: data.email,
        },
    });
};
exports.updateCabinet = updateCabinet;
// ==========================
// PRATICIEN
// ==========================
const getPraticiens = async () => {
    return await prisma_1.prisma.praticien.findMany({
        orderBy: {
            nomComplet: "asc",
        },
    });
};
exports.getPraticiens = getPraticiens;
const updatePraticien = async (id, data) => {
    return await prisma_1.prisma.praticien.update({
        where: {
            id,
        },
        data: {
            nomComplet: data.nomComplet,
            numeroRPPS: data.numeroRPPS,
            specialite: data.specialite,
        },
    });
};
exports.updatePraticien = updatePraticien;
const createPraticien = async (cabinetId, data) => {
    return await prisma_1.prisma.praticien.create({
        data: {
            cabinetId,
            nomComplet: data.nomComplet,
            numeroRPPS: data.numeroRPPS,
            specialite: data.specialite,
        },
    });
};
exports.createPraticien = createPraticien;
