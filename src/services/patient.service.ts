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
// ⬇️ REMPLACER la fonction deletePatient existante dans patient.service.ts
// par celle-ci. Tout le reste du fichier est inchangé.
//
// Assurez-vous que `prisma` est bien importé en haut du fichier :
//   import { prisma } from "../database/prisma";


/**
 * Supprime définitivement un patient et TOUT son historique.
 *
 * ⚠️ Irréversible. Le schéma Prisma n'a pas de `onDelete: Cascade`, donc il
 * faut supprimer les enregistrements enfants dans le bon ordre (les enfants
 * avant les parents), sinon Prisma rejette la suppression pour cause de
 * contrainte de clé étrangère.
 *
 * Ordre :
 *   FactureLigne → Facture → Acte / Paiement / Odontogramme
 *   → Consultation → RendezVous → Patient
 *
 * Le tout dans une transaction : si une étape échoue, rien n'est supprimé.
 */
export const deletePatient = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    // Récupérer les IDs des consultations du patient — ils servent de point
    // d'entrée pour retrouver actes, paiements, odontogrammes et factures.
    const consultations = await tx.consultation.findMany({
      where: { patientId: id },
      select: { id: true },
    });

    const consultationIds = consultations.map((c) => c.id);

    if (consultationIds.length > 0) {
      // Factures : on supprime d'abord les lignes, puis les factures.
      const factures = await tx.facture.findMany({
        where: { consultationId: { in: consultationIds } },
        select: { id: true },
      });

      const factureIds = factures.map((f) => f.id);

      if (factureIds.length > 0) {
        await tx.factureLigne.deleteMany({
          where: { factureId: { in: factureIds } },
        });

        await tx.facture.deleteMany({
          where: { id: { in: factureIds } },
        });
      }

      // Enfants directs des consultations
      await tx.odontogramme.deleteMany({
        where: { consultationId: { in: consultationIds } },
      });

      await tx.acte.deleteMany({
        where: { consultationId: { in: consultationIds } },
      });

      await tx.paiement.deleteMany({
        where: { consultationId: { in: consultationIds } },
      });

      // Puis les consultations elles-mêmes
      await tx.consultation.deleteMany({
        where: { id: { in: consultationIds } },
      });
    }

    // Rendez-vous (liés directement au patient, pas à une consultation)
    await tx.rendezVous.deleteMany({
      where: { patientId: id },
    });

    // Enfin le patient
    return await tx.patient.delete({
      where: { id },
    });
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