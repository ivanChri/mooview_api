/*
  Warnings:

  - A unique constraint covering the columns `[sub]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - The required column `sub` was added to the `Profile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `sub` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_sub_key` ON `Profile`(`sub`);
