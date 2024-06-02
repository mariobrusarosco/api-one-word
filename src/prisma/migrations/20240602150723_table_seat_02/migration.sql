/*
  Warnings:

  - You are about to drop the column `type` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `TableProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "type";

-- DropTable
DROP TABLE "TableProfile";

-- DropEnum
DROP TYPE "MessageType";

-- CreateTable
CREATE TABLE "TableSeat" (
    "id" TEXT NOT NULL,
    "role" "TableRole" NOT NULL DEFAULT 'GUEST',
    "memberId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TableSeat_id_key" ON "TableSeat"("id");

-- CreateIndex
CREATE INDEX "TableSeat_memberId_idx" ON "TableSeat"("memberId");

-- CreateIndex
CREATE INDEX "TableSeat_tableId_idx" ON "TableSeat"("tableId");
