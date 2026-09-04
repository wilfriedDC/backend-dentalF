import { prisma } from "../database/prisma";


// =====================================================
// CREATE PATIENT
// =====================================================

export const createPatient = async (data: {
  nom: string;
  prenom: string;
  sexe?: string | null;
  dateNaissance?: string | null;
  adresse?: string | null;
  telephone: string;
  email?: string | null;
}) => {
  return await prisma.patient.create({
    data: {
      nom: data.nom,
      prenom: data.prenom,
      sexe: data.sexe ?? null,
      telephone: data.telephone,
      email: data.email ?? null,
      adresse: data.adresse ?? null,

      dateNaissance: data.dateNaissance
        ? new Date(data.dateNaissance)
        : null,
    },
  });
};


// =====================================================
// GET TOUS LES PATIENTS
// =====================================================

export const getPatients = async (search?: string) => {
  return await prisma.patient.findMany({
    where: search
      ? {
          OR: [
            {
              nom: {
                contains: search,
              },
            },
            {
              prenom: {
                contains: search,
              },
            },
            {
              telephone: {
                contains: search,
              },
            },
          ],
        }
      : undefined,

    include: {
      consultations: {
        include: {
          actes: true,
          paiements: true,
          facture: true,
        },
      },

      rendezVous: true,
    },

    orderBy: {
      nom: "asc",
    },
  });
};


// =====================================================
// GET UN PATIENT PAR ID
// =====================================================

export const getPatientById = async (id: number) => {
  return await prisma.patient.findUnique({
    where: {
      id,
    },

    include: {
      // -------------------------
      // CONSULTATIONS
      // -------------------------
      consultations: {
        include: {
          actes: true,
          paiements: true,
          facture: true,
        },

        orderBy: {
          dateConsultation: "desc",
        },
      },

      // -------------------------
      // RENDEZ-VOUS
      // -------------------------
      rendezVous: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });
};


// =====================================================
// DELETE PATIENT
// =====================================================

export const deletePatient = async (id: number) => {
  return await prisma.patient.delete({
    where: {
      id,
    },
  });
};


// =====================================================
// UPDATE PATIENT
// =====================================================

export const updatePatient = async (
  id: number,
  data: {
    nom?: string;
    prenom?: string;
    sexe?: string | null;
    dateNaissance?: string | null;
    adresse?: string | null;
    telephone?: string;
    email?: string | null;
  }
) => {
  return await prisma.patient.update({
    where: {
      id,
    },

    data: {
      nom: data.nom,
      prenom: data.prenom,
      sexe: data.sexe,
      adresse: data.adresse,
      telephone: data.telephone,
      email: data.email,

      dateNaissance: data.dateNaissance
        ? new Date(data.dateNaissance)
        : undefined,
    },
  });
};