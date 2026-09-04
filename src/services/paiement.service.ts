import { prisma } from "../database/prisma";


// CREATE
export const createPaiement = async (data: {
  consultationId: number;
  montant: number;
  modePaiement?: string;
}) => {
  return await prisma.paiement.create({
    data,
  });
};


// GET ALL
export const getPaiements = async () => {
  return await prisma.paiement.findMany({
    include: {
      consultation: true,
    },
    orderBy: {
      datePaiement: "desc",
    },
  });
};


// GET BY CONSULTATION
export const getPaiementsByConsultation = async (
  consultationId: number
) => {
  return await prisma.paiement.findMany({
    where: {
      consultationId,
    },
    orderBy: {
      datePaiement: "desc",
    },
  });
};


// GET ONE
export const getPaiementById = async (
  id: number
) => {
  return await prisma.paiement.findUnique({
    where: {
      id,
    },
  });
};


// UPDATE
export const updatePaiement = async (
  id: number,
  data: {
    montant?: number;
    modePaiement?: string;
  }
) => {
  return await prisma.paiement.update({
    where: {
      id,
    },
    data,
  });
};


// DELETE
export const deletePaiement = async (
  id: number
) => {
  return await prisma.paiement.delete({
    where: {
      id,
    },
  });
};