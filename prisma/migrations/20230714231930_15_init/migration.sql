/*
  Warnings:

  - Added the required column `show_title` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Review` ADD COLUMN `show_title` VARCHAR(191) NOT NULL;
