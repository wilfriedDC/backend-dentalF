-- CreateTable
CREATE TABLE "Odontogramme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consultationId" INTEGER NOT NULL,
    "numeroDent" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "face" TEXT,
    "commentaire" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Odontogramme_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
