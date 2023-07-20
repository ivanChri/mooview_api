/*
  Warnings:

  - You are about to drop the `HistoryToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `HistoryToUser` DROP FOREIGN KEY `HistoryToUser_history_id_fkey`;

-- DropForeignKey
ALTER TABLE `HistoryToUser` DROP FOREIGN KEY `HistoryToUser_user_id_fkey`;

-- DropTable
DROP TABLE `HistoryToUser`;
