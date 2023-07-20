/*
  Warnings:

  - You are about to drop the column `history_id` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `history_id` on the `FavoriteTvShow` table. All the data in the column will be lost.
  - You are about to drop the column `history_id` on the `Review` table. All the data in the column will be lost.
  - Added the required column `history_detail_id` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `history_detail_id` to the `FavoriteTvShow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `history_detail_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `FavoriteMovie` DROP FOREIGN KEY `FavoriteMovie_history_id_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteTvShow` DROP FOREIGN KEY `FavoriteTvShow_history_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_history_id_fkey`;

-- AlterTable
ALTER TABLE `FavoriteMovie` DROP COLUMN `history_id`,
    ADD COLUMN `history_detail_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteTvShow` DROP COLUMN `history_id`,
    ADD COLUMN `history_detail_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `history_id`,
    ADD COLUMN `history_detail_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `HistoryDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `history_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_history_detail_id_fkey` FOREIGN KEY (`history_detail_id`) REFERENCES `HistoryDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteMovie` ADD CONSTRAINT `FavoriteMovie_history_detail_id_fkey` FOREIGN KEY (`history_detail_id`) REFERENCES `HistoryDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteTvShow` ADD CONSTRAINT `FavoriteTvShow_history_detail_id_fkey` FOREIGN KEY (`history_detail_id`) REFERENCES `HistoryDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryDetail` ADD CONSTRAINT `HistoryDetail_history_id_fkey` FOREIGN KEY (`history_id`) REFERENCES `History`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
