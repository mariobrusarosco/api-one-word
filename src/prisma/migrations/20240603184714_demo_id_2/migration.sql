/*
  Warnings:

  - You are about to drop the column `demoId` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authServiceId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authServiceId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Member_demoId_key";

-- DropIndex
DROP INDEX "Member_userId_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "demoId",
DROP COLUMN "userId",
ADD COLUMN     "authServiceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_authServiceId_key" ON "Member"("authServiceId");
