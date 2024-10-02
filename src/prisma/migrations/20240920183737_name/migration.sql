/*
  Warnings:

  - You are about to drop the column `tempId` on the `TableSeat` table. All the data in the column will be lost.
  - Added the required column `nickname` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Member` ADD COLUMN `nickname` VARCHAR(191) NOT NULL,
    MODIFY `firstName` VARCHAR(191) NULL,
    MODIFY `lastName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `TableSeat` DROP COLUMN `tempId`;
