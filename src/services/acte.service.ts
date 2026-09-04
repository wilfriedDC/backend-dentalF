import { prisma } from "../database/prisma";

export const createActe = async (data: {
  consultationId: number;
  numeroDent?: string;
  nomActe: string;
  description?: string;
  prix: number;
}) => {
  return await prisma.acte.create({
    data,
  });
};


export const getActes = async () => {
  return await prisma.acte.findMany({
    include: {
      consultation: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};


export const getActesByConsultation = async (
  consultationId: number
) => {
  return await prisma.acte.findMany({
    where: {
      consultationId,
    },
    orderBy: {
      id: "asc",
    },
  });
};


export const getActeById = async (id: number) => {
  return await prisma.acte.findUnique({
    where: {
      id,
    },
  });
};


export const updateActe = async (
  id: number,
  data: {
    numeroDent?: string;
    nomActe?: string;
    description?: string;
    prix?: number;
  }
) => {
  return await prisma.acte.update({
    where: {
      id,
    },
    data,
  });
};


export const deleteActe = async (id: number) => {
  return await prisma.acte.delete({
    where: {
      id,
    },
  });
};