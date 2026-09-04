import { prisma } from "../database/prisma";


// ==========================
// CABINET
// ==========================

export const getCabinet = async () => {
  return await prisma.cabinet.findFirst({
    include: {
      praticiens: true,
    },
  });
};


export const updateCabinet = async (data: {
  nom: string;
  adresse?: string;
  telephone?: string;
  email?: string;
}) => {

  const cabinet = await prisma.cabinet.findFirst();

  if (!cabinet) {
    return await prisma.cabinet.create({
      data: {
        nom: data.nom,
        adresse: data.adresse,
        telephone: data.telephone,
        email: data.email,
      },
    });
  }

  return await prisma.cabinet.update({
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


// ==========================
// PRATICIEN
// ==========================

export const getPraticiens = async () => {
  return await prisma.praticien.findMany({
    orderBy: {
      nomComplet: "asc",
    },
  });
};


export const updatePraticien = async (
  id: number,
  data: {
    nomComplet: string;
    numeroRPPS?: string;
    specialite?: string;
  }
) => {

  return await prisma.praticien.update({
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


export const createPraticien = async (
  cabinetId: number,
  data: {
    nomComplet: string;
    numeroRPPS?: string;
    specialite?: string;
  }
) => {

  return await prisma.praticien.create({
    data: {
      cabinetId,
      nomComplet: data.nomComplet,
      numeroRPPS: data.numeroRPPS,
      specialite: data.specialite,
    },
  });
};