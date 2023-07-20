/*
  Warnings:

  - You are about to drop the column `profileRecord_id` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `ProfileHistoryRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_profileRecord_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileHistoryRecord` DROP FOREIGN KEY `ProfileHistoryRecord_activity_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileHistoryRecord` DROP FOREIGN KEY `ProfileHistoryRecord_user_id_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `profileRecord_id`;

-- DropTable
DROP TABLE `ProfileHistoryRecord`;
