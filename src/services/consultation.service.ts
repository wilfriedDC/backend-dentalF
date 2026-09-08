import { prisma } from "../database/prisma";
export const createConsultation = async (data: {
  patientId: number;
  motifConsultation: string;
  observation?: string | null;
  prochainRdvDate?: string | null;
  prochainRdvHeure?: string | null;

  acte?: {
    numeroDent?: string | null;
    nomActe: string;
    description?: string | null;
    prix: number;
  } | null;

  paiement?: {
    montant: number;
    modePaiement?: string | null;
  } | null;
}) => {

  return await prisma.$transaction(async (tx) => {

    //  Créer la consultation
    const consultation = await tx.consultation.create({
      data: {
        patientId: data.patientId,

        motifConsultation: data.motifConsultation,

        observation: data.observation ?? null,

        prochainRdvDate: data.prochainRdvDate
          ? new Date(data.prochainRdvDate)
          : null,

        prochainRdvHeure:
          data.prochainRdvHeure ?? null,
      },
    });


    //  Créer l'acte
    if (data.acte) {

      await tx.acte.create({
        data: {
          consultationId: consultation.id,

          numeroDent:
            data.acte.numeroDent ?? null,

          nomActe:
            data.acte.nomActe,

          description:
            data.acte.description ?? null,

          prix:
            data.acte.prix,
        },
      });
    }


    //  Créer le paiement
    if (
      data.paiement &&
      data.paiement.montant > 0
    ) {

      await tx.paiement.create({
        data: {
          consultationId: consultation.id,

          montant:
            data.paiement.montant,

          modePaiement:
            data.paiement.modePaiement ?? null,
        },
      });
    }


    //  Créer le rendez-vous
    if (
      data.prochainRdvDate &&
      data.prochainRdvHeure
    ) {

      await tx.rendezVous.create({
        data: {

          patientId:
            data.patientId,

          date:
            new Date(data.prochainRdvDate),

          heure:
            data.prochainRdvHeure,

          motif:
            data.motifConsultation,

          statut:
            "PLANIFIE",
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

export const getConsultations = async () => {
  return await prisma.consultation.findMany({
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


export const getConsultationById = async (id: number) => {
  return await prisma.consultation.findUnique({
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


export const updateConsultation = async (
  id: number,
  data: {
    motifConsultation?: string;
    observation?: string;
    prochainRdvDate?: string;
    prochainRdvHeure?: string;
  }
) => {
  return await prisma.consultation.update({
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


export const deleteConsultation = async (id: number) => {
  return await prisma.consultation.delete({
    where: {
      id,
    },
  });
};

export const getConsultationSummary = async (id: number) => {
  const consultation = await prisma.consultation.findUnique({
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

  const total = consultation.actes.reduce(
    (sum, acte) => sum + acte.prix,
    0
  );

  const avance = consultation.paiements.reduce(
    (sum, paiement) => sum + paiement.montant,
    0
  );

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

export const getFullConsultation = async (id: number) => {
  return await prisma.consultation.findUnique({
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