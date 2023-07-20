/*
  Warnings:

  - You are about to drop the column `movieRecord` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `tvshowRecord` on the `FavoriteTvShow` table. All the data in the column will be lost.
  - You are about to drop the column `reviewRecord` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `FavoriteMovieHistoryRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FavoriteTvShowHistoryRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewHistoryRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FavoriteMovie` DROP FOREIGN KEY `FavoriteMovie_movieRecord_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteMovieHistoryRecord` DROP FOREIGN KEY `FavoriteMovieHistoryRecord_activity_id_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteMovieHistoryRecord` DROP FOREIGN KEY `FavoriteMovieHistoryRecord_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteTvShow` DROP FOREIGN KEY `FavoriteTvShow_tvshowRecord_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteTvShowHistoryRecord` DROP FOREIGN KEY `FavoriteTvShowHistoryRecord_activity_id_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteTvShowHistoryRecord` DROP FOREIGN KEY `FavoriteTvShowHistoryRecord_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_reviewRecord_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewHistoryRecord` DROP FOREIGN KEY `ReviewHistoryRecord_activty_id_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewHistoryRecord` DROP FOREIGN KEY `ReviewHistoryRecord_user_id_fkey`;

-- AlterTable
ALTER TABLE `FavoriteMovie` DROP COLUMN `movieRecord`;

-- AlterTable
ALTER TABLE `FavoriteTvShow` DROP COLUMN `tvshowRecord`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `reviewRecord`;

-- DropTable
DROP TABLE `FavoriteMovieHistoryRecord`;

-- DropTable
DROP TABLE `FavoriteTvShowHistoryRecord`;

-- DropTable
DROP TABLE `ReviewHistoryRecord`;

-- CreateTable
CREATE TABLE `HistoryRecord` (
    `id` VARCHAR(191) NOT NULL,
    `commit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activity_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `detail` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HistoryRecord` ADD CONSTRAINT `HistoryRecord_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistoryRecord` ADD CONSTRAINT `HistoryRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
