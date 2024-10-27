/*
  Warnings:

  - You are about to drop the column `memberFullName` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "memberFullName",
ADD COLUMN     "memberNickname" TEXT NOT NULL DEFAULT '';
