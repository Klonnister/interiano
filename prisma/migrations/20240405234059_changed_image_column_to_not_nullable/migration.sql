/*
  Warnings:

  - Made the column `image` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `image` VARCHAR(191) NOT NULL;
