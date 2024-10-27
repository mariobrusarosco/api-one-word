/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "publicId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Member_publicId_key" ON "Member"("publicId");
