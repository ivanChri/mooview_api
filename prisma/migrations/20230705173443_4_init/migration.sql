/*
  Warnings:

  - You are about to drop the column `history_id` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_history_id_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `history_id`;
