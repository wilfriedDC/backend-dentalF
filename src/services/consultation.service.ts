import { prisma } from "../database/prisma";

// Type d'un acte individuel, utilisé aussi bien pour "acte" (singulier,
// rétrocompatibilité) que pour "actes" (tableau, panier multi-actes).
interface ActeInput {
  numeroDent?: string | null;
  nomActe: string;
  description?: string | null;
  prix: number;
}

export const createConsultation = async (data: {
  patientId: number;
  motifConsultation: string;
  observation?: string | null;
  prochainRdvDate?: string | null;
  prochainRdvHeure?: string | null;

  // Rétrocompatibilité : un seul acte.
  acte?: ActeInput | null;

  // Nouveau : plusieurs actes (panier), créés tous dans la même transaction.
  actes?: ActeInput[];

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


    //  Rassembler tous les actes à créer : le tableau "actes" (nouveau) et/ou
    //  l'acte singulier "acte" (ancien format), pour ne rien casser côté
    //  clients qui envoient encore l'ancien format.
    const allActes: ActeInput[] = [
      ...(data.actes ?? []),
      ...(data.acte ? [data.acte] : []),
    ];

    if (allActes.length > 0) {
      await tx.acte.createMany({
        data: allActes.map((acte) => ({
          consultationId: consultation.id,
          numeroDent: acte.numeroDent ?? null,
          nomActe: acte.nomActe,
          description: acte.description ?? null,
          prix: acte.prix,
        })),
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

export const addPaiement = async (
  consultationId: number,
  data: {
    montant: number;
    modePaiement?: string | null;
  }
) => {
  // Vérifie que la consultation existe avant d'y attacher un paiement
  const consultation = await prisma.consultation.findUnique({
    where: { id: consultationId },
  });

  if (!consultation) {
    return null;
  }

  await prisma.paiement.create({
    data: {
      consultationId,
      montant: data.montant,
      modePaiement: data.modePaiement ?? null,
    },
  });

  // Retourne la consultation à jour, avec tous ses paiements — c'est ce
  // que le frontend affiche ensuite dans la facture.
  return await prisma.consultation.findUnique({
    where: { id: consultationId },
    include: {
      patient: true,
      actes: true,
      paiements: true,
    },
  });
};