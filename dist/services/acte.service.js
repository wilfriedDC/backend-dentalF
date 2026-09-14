"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActe = exports.updateActe = exports.getActeById = exports.getActesByConsultation = exports.getActes = exports.createActe = void 0;
const prisma_1 = require("../database/prisma");
const createActe = async (data) => {
    return await prisma_1.prisma.acte.create({
        data,
    });
};
exports.createActe = createActe;
const getActes = async () => {
    return await prisma_1.prisma.acte.findMany({
        include: {
            consultation: true,
        },
        orderBy: {
            id: "desc",
        },
    });
};
exports.getActes = getActes;
const getActesByConsultation = async (consultationId) => {
    return await prisma_1.prisma.acte.findMany({
        where: {
            consultationId,
        },
        orderBy: {
            id: "asc",
        },
    });
};
exports.getActesByConsultation = getActesByConsultation;
const getActeById = async (id) => {
    return await prisma_1.prisma.acte.findUnique({
        where: {
            id,
        },
    });
};
exports.getActeById = getActeById;
const updateActe = async (id, data) => {
    return await prisma_1.prisma.acte.update({
        where: {
            id,
        },
        data,
    });
};
exports.updateActe = updateActe;
const deleteActe = async (id) => {
    return await prisma_1.prisma.acte.delete({
        where: {
            id,
        },
    });
};
exports.deleteActe = deleteActe;
