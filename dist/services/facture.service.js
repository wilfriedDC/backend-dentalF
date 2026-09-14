"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactureById = exports.getFactures = exports.createFacture = void 0;
const prisma_1 = require("../database/prisma");
const createFacture = async (consultationId, remise = 0) => {
    // Vérifier que la consultation existe
    const consultation = await prisma_1.prisma.consultation.findUnique({
        where: {
            id: consultationId,
        },
        include: {
            actes: true,
            facture: true,
        },
    });
    if (!consultation) {
        throw new Error("Consultation introuvable");
    }
    // Une consultation = une seule facture
    if (consultation.facture) {
        throw new Error("Cette consultation possède déjà une facture");
    }
    if (consultation.actes.length === 0) {
        throw new Error("Impossible de créer une facture sans acte");
    }
    // Calcul du total
    const total = consultation.actes.reduce((sum, acte) => sum + acte.prix, 0);
    if (remise < 0 || remise > total) {
        throw new Error("Remise invalide");
    }
    const montantDu = total - remise;
    // Numéro simple pour commencer
    const count = await prisma_1.prisma.facture.count();
    const numero = `FAC-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
    const facture = await prisma_1.prisma.facture.create({
        data: {
            numero,
            consultationId,
            total,
            remise,
            montantDu,
            lignes: {
                create: consultation.actes.map((acte) => ({
                    nomActe: acte.nomActe,
                    numeroDent: acte.numeroDent,
                    prix: acte.prix,
                    quantite: 1,
                })),
            },
        },
        include: {
            consultation: {
                include: {
                    patient: true,
                },
            },
            lignes: true,
        },
    });
    return facture;
};
exports.createFacture = createFacture;
const getFactures = async () => {
    return await prisma_1.prisma.facture.findMany({
        include: {
            consultation: {
                include: {
                    patient: true,
                },
            },
            lignes: true,
            // Si ton modèle Paiement est directement
            // relié à Facture, on l'ajoutera ici.
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getFactures = getFactures;
const getFactureById = async (id) => {
    return await prisma_1.prisma.facture.findUnique({
        where: {
            id,
        },
        include: {
            consultation: {
                include: {
                    patient: true,
                },
            },
            lignes: true,
        },
    });
};
exports.getFactureById = getFactureById;
