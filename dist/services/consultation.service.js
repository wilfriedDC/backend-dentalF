"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaiement = exports.getFullConsultation = exports.getConsultationSummary = exports.deleteConsultation = exports.updateConsultation = exports.getConsultationById = exports.getConsultations = exports.createConsultation = void 0;
const prisma_1 = require("../database/prisma");
const createConsultation = async (data) => {
    return await prisma_1.prisma.$transaction(async (tx) => {
        //  Créer la consultation
        const consultation = await tx.consultation.create({
            data: {
                patientId: data.patientId,
                motifConsultation: data.motifConsultation,
                observation: data.observation ?? null,
                prochainRdvDate: data.prochainRdvDate
                    ? new Date(data.prochainRdvDate)
                    : null,
                prochainRdvHeure: data.prochainRdvHeure ?? null,
            },
        });
        //  Rassembler tous les actes à créer : le tableau "actes" (nouveau) et/ou
        //  l'acte singulier "acte" (ancien format), pour ne rien casser côté
        //  clients qui envoient encore l'ancien format.
        const allActes = [
            ...(data.actes ?? []),
            ...(data.acte ? [data.acte] : []),
        ];
        if (allActes.length > 0) {
            await tx.acte.createMany({
                data: allActes.map((acte) => ({
                    consultationId: consultation.id,
                    numeroDent: acte.numeroDent ?? null,
                    nomActe: acte.nomActe,
                    description: acte.description ?? null,
                    prix: acte.prix,
                })),
            });
        }
        //  Créer le paiement
        if (data.paiement &&
            data.paiement.montant > 0) {
            await tx.paiement.create({
                data: {
                    consultationId: consultation.id,
                    montant: data.paiement.montant,
                    modePaiement: data.paiement.modePaiement ?? null,
                },
            });
        }
        //  Créer le rendez-vous
        if (data.prochainRdvDate &&
            data.prochainRdvHeure) {
            await tx.rendezVous.create({
                data: {
                    patientId: data.patientId,
                    date: new Date(data.prochainRdvDate),
                    heure: data.prochainRdvHeure,
                    motif: data.motifConsultation,
                    statut: "PLANIFIE",
                },
            });
        }
        //  Retourner la consultation complète
        return await tx.consultation.findUnique({
            where: {
                id: consultation.id,
            },
            include: {
                patient: true,
                actes: true,
                paiements: true,
            },
        });
    });
};
exports.createConsultation = createConsultation;
const getConsultations = async () => {
    return await prisma_1.prisma.consultation.findMany({
        include: {
            patient: true,
            actes: true,
            paiements: true,
        },
        orderBy: {
            dateConsultation: "desc",
        },
    });
};
exports.getConsultations = getConsultations;
const getConsultationById = async (id) => {
    return await prisma_1.prisma.consultation.findUnique({
        where: {
            id,
        },
        include: {
            patient: true,
            actes: true,
            paiements: true,
        },
    });
};
exports.getConsultationById = getConsultationById;
const updateConsultation = async (id, data) => {
    return await prisma_1.prisma.consultation.update({
        where: {
            id,
        },
        data: {
            motifConsultation: data.motifConsultation,
            observation: data.observation,
            prochainRdvDate: data.prochainRdvDate
                ? new Date(data.prochainRdvDate)
                : undefined,
            prochainRdvHeure: data.prochainRdvHeure,
        },
    });
};
exports.updateConsultation = updateConsultation;
const deleteConsultation = async (id) => {
    return await prisma_1.prisma.consultation.delete({
        where: {
            id,
        },
    });
};
exports.deleteConsultation = deleteConsultation;
const getConsultationSummary = async (id) => {
    const consultation = await prisma_1.prisma.consultation.findUnique({
        where: {
            id,
        },
        include: {
            patient: true,
            actes: true,
            paiements: true,
        },
    });
    if (!consultation) {
        return null;
    }
    const total = consultation.actes.reduce((sum, acte) => sum + acte.prix, 0);
    const avance = consultation.paiements.reduce((sum, paiement) => sum + paiement.montant, 0);
    const reste = total - avance;
    return {
        consultation: {
            id: consultation.id,
            dateConsultation: consultation.dateConsultation,
            motifConsultation: consultation.motifConsultation,
            observation: consultation.observation,
            prochainRdvDate: consultation.prochainRdvDate,
            prochainRdvHeure: consultation.prochainRdvHeure,
        },
        patient: consultation.patient,
        actes: consultation.actes,
        paiements: consultation.paiements,
        finances: {
            total,
            avance,
            reste,
        },
    };
};
exports.getConsultationSummary = getConsultationSummary;
const getFullConsultation = async (id) => {
    return await prisma_1.prisma.consultation.findUnique({
        where: {
            id,
        },
        include: {
            patient: true,
            actes: true,
            paiements: true,
            odontogrammes: true,
        },
    });
};
exports.getFullConsultation = getFullConsultation;
const addPaiement = async (consultationId, data) => {
    // Vérifie que la consultation existe avant d'y attacher un paiement
    const consultation = await prisma_1.prisma.consultation.findUnique({
        where: { id: consultationId },
    });
    if (!consultation) {
        return null;
    }
    await prisma_1.prisma.paiement.create({
        data: {
            consultationId,
            montant: data.montant,
            modePaiement: data.modePaiement ?? null,
        },
    });
    // Retourne la consultation à jour, avec tous ses paiements — c'est ce
    // que le frontend affiche ensuite dans la facture.
    return await prisma_1.prisma.consultation.findUnique({
        where: { id: consultationId },
        include: {
            patient: true,
            actes: true,
            paiements: true,
        },
    });
};
exports.addPaiement = addPaiement;
