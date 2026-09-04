import { prisma } from "../database/prisma";

export const createRendezVous = async (data: {
  patientId: number;
  date: string;
  heure: string;
  motif?: string;
  statut?: string;
}) => {
  return await prisma.rendezVous.create({
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


export const getRendezVous = async () => {
  return await prisma.rendezVous.findMany({
    include: {
      patient: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};


export const getRendezVousById = async (id: number) => {
  return await prisma.rendezVous.findUnique({
    where: { id },
    include: {
      patient: true,
    },
  });
};


export const updateRendezVous = async (
  id: number,
  data: {
    date?: string;
    heure?: string;
    motif?: string;
    statut?: string;
  }
) => {
  return await prisma.rendezVous.update({
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


export const deleteRendezVous = async (id: number) => {
  return await prisma.rendezVous.delete({
    where: { id },
  });
};