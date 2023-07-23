/*
  Warnings:

  - A unique constraint covering the columns `[sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `sub` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_author_id_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `sub` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_sub_key` ON `User`(`sub`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`sub`) ON DELETE RESTRICT ON UPDATE CASCADE;
