-- CreateTable
CREATE TABLE "Cabinet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "adresse" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Praticien" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cabinetId" INTEGER NOT NULL,
    "nomComplet" TEXT NOT NULL,
    "numeroRPPS" TEXT,
    "specialite" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Praticien_cabinetId_fkey" FOREIGN KEY ("cabinetId") REFERENCES "Cabinet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
