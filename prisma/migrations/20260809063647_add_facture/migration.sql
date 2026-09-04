-- CreateTable
CREATE TABLE "Facture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "consultationId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "remise" INTEGER NOT NULL DEFAULT 0,
    "montantDu" INTEGER NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'NON_PAYEE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Facture_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FactureLigne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "factureId" INTEGER NOT NULL,
    "nomActe" TEXT NOT NULL,
    "numeroDent" TEXT,
    "prix" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FactureLigne_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "Facture" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Facture_numero_key" ON "Facture"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Facture_consultationId_key" ON "Facture"("consultationId");
