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


// GET BY PATIENT (état actuel agrégé) — pour chaque dent, on ne garde que la
// ligne la plus récente parmi TOUTES les consultations du patient. C'est ce
// qui alimente l'affichage du schéma dentaire sur la fiche patient.
export const getByPatient = async (patientId: number) => {
  const consultations = await prisma.consultation.findMany({
    where: { patientId },
    select: { id: true },
  });

  const consultationIds = consultations.map((c) => c.id);
  if (consultationIds.length === 0) return [];

  const entries = await prisma.odontogramme.findMany({
    where: { consultationId: { in: consultationIds } },
    orderBy: { updatedAt: "desc" },
  });

  // On ne garde que la première occurrence rencontrée par dent (donc la plus
  // récente, grâce au tri ci-dessus).
  const latestByTooth = new Map<string, (typeof entries)[number]>();
  for (const entry of entries) {
    if (!latestByTooth.has(entry.numeroDent)) {
      latestByTooth.set(entry.numeroDent, entry);
    }
  }

  return Array.from(latestByTooth.values());
};


// UPSERT pour une dent, rattachée à une consultation précise du patient.
// Une seule ligne par (consultationId, numeroDent) grâce à la contrainte
// unique ajoutée au schéma — un second appel sur la même dent/consultation
// met simplement à jour la ligne existante au lieu d'en créer une nouvelle.
export const upsertToothForConsultation = async (data: {
  consultationId: number;
  numeroDent: string;
  statut: string;
  commentaire?: string;
}) => {
  return await prisma.odontogramme.upsert({
    where: {
      consultationId_numeroDent: {
        consultationId: data.consultationId,
        numeroDent: data.numeroDent,
      },
    },
    update: {
      statut: data.statut,
      commentaire: data.commentaire,
    },
    create: {
      consultationId: data.consultationId,
      numeroDent: data.numeroDent,
      statut: data.statut,
      commentaire: data.commentaire,
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