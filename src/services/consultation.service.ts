import { prisma } from "../database/prisma";

export const createConsultation = async (data: {
  patientId: number;
  motifConsultation: string;
  observation?: string;
  prochainRdvDate?: string;
  prochainRdvHeure?: string;
}) => {
  return await prisma.consultation.create({
    data: {
      patientId: data.patientId,
      motifConsultation: data.motifConsultation,
      observation: data.observation,

      prochainRdvDate: data.prochainRdvDate
        ? new Date(data.prochainRdvDate)
        : undefined,

      prochainRdvHeure: data.prochainRdvHeure,
    },
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