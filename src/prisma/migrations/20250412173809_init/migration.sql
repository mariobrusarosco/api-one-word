/*
  Warnings:

  - You are about to drop the column `inviteCode` on the `Table` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Table_inviteCode_key";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "inviteCode";
