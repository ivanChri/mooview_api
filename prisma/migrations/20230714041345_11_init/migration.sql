/*
  Warnings:

  - You are about to drop the column `history_detail_id` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `history_detail_id` on the `FavoriteTvShow` table. All the data in the column will be lost.
  - You are about to drop the column `history_detail_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoryDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FavoriteMovie` DROP FOREIGN KEY `FavoriteMovie_history_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteTvShow` DROP FOREIGN KEY `FavoriteTvShow_history_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_activity_id_fkey`;

-- DropForeignKey
ALTER TABLE `History` DROP FOREIGN KEY `History_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `HistoryDetail` DROP FOREIGN KEY `HistoryDetail_history_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_history_detail_id_fkey`;

-- AlterTable
ALTER TABLE `FavoriteMovie` DROP COLUMN `history_detail_id`;

-- AlterTable
ALTER TABLE `FavoriteTvShow` DROP COLUMN `history_detail_id`;

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `history_detail_id`;

-- DropTable
DROP TABLE `History`;

-- DropTable
DROP TABLE `HistoryDetail`;

-- CreateTable
CREATE TABLE `ProfileHistoryRecord` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profile_id` VARCHAR(191) NOT NULL,
    `activity_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewHistoryRecord` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `review_id` VARCHAR(191) NOT NULL,
    `activty_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteMovieHistoryRecord` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `favorite_movie_id` VARCHAR(191) NOT NULL,
    `activity_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FavoriteTvShowHistoryRecord` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tvshow_id` VARCHAR(191) NOT NULL,
    `activity_id` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfileHistoryRecord` ADD CONSTRAINT `ProfileHistoryRecord_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `Profile`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileHistoryRecord` ADD CONSTRAINT `ProfileHistoryRecord_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileHistoryRecord` ADD CONSTRAINT `ProfileHistoryRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewHistoryRecord` ADD CONSTRAINT `ReviewHistoryRecord_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewHistoryRecord` ADD CONSTRAINT `ReviewHistoryRecord_activty_id_fkey` FOREIGN KEY (`activty_id`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewHistoryRecord` ADD CONSTRAINT `ReviewHistoryRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteMovieHistoryRecord` ADD CONSTRAINT `FavoriteMovieHistoryRecord_favorite_movie_id_fkey` FOREIGN KEY (`favorite_movie_id`) REFERENCES `FavoriteMovie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteMovieHistoryRecord` ADD CONSTRAINT `FavoriteMovieHistoryRecord_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteMovieHistoryRecord` ADD CONSTRAINT `FavoriteMovieHistoryRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteTvShowHistoryRecord` ADD CONSTRAINT `FavoriteTvShowHistoryRecord_tvshow_id_fkey` FOREIGN KEY (`tvshow_id`) REFERENCES `FavoriteTvShow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteTvShowHistoryRecord` ADD CONSTRAINT `FavoriteTvShowHistoryRecord_activity_id_fkey` FOREIGN KEY (`activity_id`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteTvShowHistoryRecord` ADD CONSTRAINT `FavoriteTvShowHistoryRecord_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
