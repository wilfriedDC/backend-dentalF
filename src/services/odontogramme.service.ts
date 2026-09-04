import { prisma } from "../database/prisma";


// CREATE
export const createOdontogramme = async (data: {
  consultationId: number;
  numeroDent: string;
  statut: string;
  face?: string;
  commentaire?: string;
}) => {
  return await prisma.odontogramme.create({
    data,
  });
};


// GET BY CONSULTATION
export const getByConsultation = async (
  consultationId: number
) => {
  return await prisma.odontogramme.findMany({
    where: {
      consultationId,
    },

    orderBy: {
      numeroDent: "asc",
    },
  });
};


// GET ONE
export const getById = async (
  id: number
) => {
  return await prisma.odontogramme.findUnique({
    where: {
      id,
    },
  });
};


// UPDATE
export const updateOdontogramme = async (
  id: number,
  data: {
    numeroDent?: string;
    statut?: string;
    face?: string;
    commentaire?: string;
  }
) => {
  return await prisma.odontogramme.update({
    where: {
      id,
    },

    data,
  });
};


// DELETE
export const deleteOdontogramme = async (
  id: number
) => {
  return await prisma.odontogramme.delete({
    where: {
      id,
    },
  });
};