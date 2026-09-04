-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "sexe" TEXT,
    "dateNaissance" DATETIME,
    "adresse" TEXT,
    "telephone" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "dateConsultation" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motifConsultation" TEXT NOT NULL,
    "observation" TEXT,
    "prochainRdvDate" DATETIME,
    "prochainRdvHeure" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Acte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultationId" INTEGER NOT NULL,
    "numeroDent" TEXT,
    "nomActe" TEXT NOT NULL,
    "description" TEXT,
    "prix" REAL NOT NULL,
    CONSTRAINT "Acte_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultationId" INTEGER NOT NULL,
    "datePaiement" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant" REAL NOT NULL,
    "modePaiement" TEXT,
    CONSTRAINT "Paiement_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
