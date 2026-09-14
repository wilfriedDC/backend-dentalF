/*
  Warnings:

  - A unique constraint covering the columns `[consultationId,numeroDent]` on the table `Odontogramme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Odontogramme_consultationId_numeroDent_key" ON "Odontogramme"("consultationId", "numeroDent");
