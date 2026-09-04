import { prisma } from "../database/prisma";

export const getDashboard = async () => {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const totalPatients = await prisma.patient.count();

  const consultationsToday =
    await prisma.consultation.count({
      where: {
        dateConsultation: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

  const appointmentsToday =
    await prisma.rendezVous.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        patient: true,
      },
      orderBy: {
        heure: "asc",
      },
    });

  const paymentsToday =
    await prisma.paiement.findMany({
      where: {
        datePaiement: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

  const revenueToday = paymentsToday.reduce(
    (total, paiement) =>
      total + paiement.montant,
    0
  );

  const consultations =
    await prisma.consultation.findMany({
      include: {
        actes: true,
        paiements: true,
      },
    });

  let totalUnpaid = 0;

  for (const consultation of consultations) {
    const totalActes = consultation.actes.reduce(
      (sum, acte) => sum + acte.prix,
      0
    );

    const totalPaiements =
      consultation.paiements.reduce(
        (sum, paiement) => sum + paiement.montant,
        0
      );

    totalUnpaid += Math.max(
      0,
      totalActes - totalPaiements
    );
  }

  const upcomingAppointments =
    await prisma.rendezVous.findMany({
      where: {
        date: {
          gte: now,
        },
        statut: {
          not: "ANNULE",
        },
      },
      include: {
        patient: true,
      },
      orderBy: [
        {
          date: "asc",
        },
        {
          heure: "asc",
        },
      ],
      take: 5,
    });

  return {
    totalPatients,
    consultationsToday,
    appointmentsToday,
    revenueToday,
    totalUnpaid,
    upcomingAppointments,
  };
};