/*
  Warnings:

  - You are about to drop the column `authServiceId` on the `Member` table. All the data in the column will be lost.
  - Made the column `publicId` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Member_authServiceId_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "authServiceId",
ALTER COLUMN "publicId" SET NOT NULL;
