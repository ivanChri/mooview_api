/*
  Warnings:

  - A unique constraint covering the columns `[credential]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credential` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `credential` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_credential_key` ON `User`(`credential`);
