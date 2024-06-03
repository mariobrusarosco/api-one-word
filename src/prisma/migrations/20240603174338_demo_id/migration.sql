/*
  Warnings:

  - A unique constraint covering the columns `[demoId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "demoId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Member_demoId_key" ON "Member"("demoId");
