import { prisma } from "../database/prisma";

export const createFacture = async (
  consultationId: number,
  remise = 0
) => {
  // Vérifier que la consultation existe
  const consultation = await prisma.consultation.findUnique({
    where: {
      id: consultationId,
    },
    include: {
      actes: true,
      facture: true,
    },
  });

  if (!consultation) {
    throw new Error("Consultation introuvable");
  }

  // Une consultation = une seule facture
  if (consultation.facture) {
    throw new Error("Cette consultation possède déjà une facture");
  }

  if (consultation.actes.length === 0) {
    throw new Error(
      "Impossible de créer une facture sans acte"
    );
  }

  // Calcul du total
  const total = consultation.actes.reduce(
    (sum, acte) => sum + acte.prix,
    0
  );

  if (remise < 0 || remise > total) {
    throw new Error("Remise invalide");
  }

  const montantDu = total - remise;

  // Numéro simple pour commencer
  const count = await prisma.facture.count();

  const numero =
    `FAC-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const facture = await prisma.facture.create({
    data: {
      numero,
      consultationId,
      total,
      remise,
      montantDu,

      lignes: {
        create: consultation.actes.map((acte) => ({
          nomActe: acte.nomActe,
          numeroDent: acte.numeroDent,
          prix: acte.prix,
          quantite: 1,
        })),
      },
    },

    include: {
      consultation: {
        include: {
          patient: true,
        },
      },

      lignes: true,
    },
  });

  return facture;
};


export const getFactures = async () => {
  return await prisma.facture.findMany({
    include: {
      consultation: {
        include: {
          patient: true,
        },
      },

      lignes: true,

      // Si ton modèle Paiement est directement
      // relié à Facture, on l'ajoutera ici.
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};


export const getFactureById = async (
  id: number
) => {
  return await prisma.facture.findUnique({
    where: {
      id,
    },

    include: {
      consultation: {
        include: {
          patient: true,
        },
      },

      lignes: true,
    },
  });
};