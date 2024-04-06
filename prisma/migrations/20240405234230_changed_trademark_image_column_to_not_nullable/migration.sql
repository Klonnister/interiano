/*
  Warnings:

  - Made the column `image` on table `trademarks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `trademarks` MODIFY `image` VARCHAR(191) NOT NULL;
