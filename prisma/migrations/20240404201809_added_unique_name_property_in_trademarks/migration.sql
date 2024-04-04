/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `trademarks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `trademarks_name_key` ON `trademarks`(`name`);
