/*
  Warnings:

  - You are about to drop the column `favorite_movie_id` on the `FavoriteMovieHistoryRecord` table. All the data in the column will be lost.
  - You are about to drop the column `tvshow_id` on the `FavoriteTvShowHistoryRecord` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `ProfileHistoryRecord` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `ReviewHistoryRecord` table. All the data in the column will be lost.
  - Added the required column `movieRecord` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tvshowRecord` to the `FavoriteTvShow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileRecord_id` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewRecord` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `FavoriteMovieHistoryRecord` DROP FOREIGN KEY `FavoriteMovieHistoryRecord_favorite_movie_id_fkey`;

-- DropForeignKey
ALTER TABLE `FavoriteTvShowHistoryRecord` DROP FOREIGN KEY `FavoriteTvShowHistoryRecord_tvshow_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProfileHistoryRecord` DROP FOREIGN KEY `ProfileHistoryRecord_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewHistoryRecord` DROP FOREIGN KEY `ReviewHistoryRecord_review_id_fkey`;

-- AlterTable
ALTER TABLE `FavoriteMovie` ADD COLUMN `movieRecord` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteMovieHistoryRecord` DROP COLUMN `favorite_movie_id`;

-- AlterTable
ALTER TABLE `FavoriteTvShow` ADD COLUMN `tvshowRecord` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteTvShowHistoryRecord` DROP COLUMN `tvshow_id`;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `profileRecord_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ProfileHistoryRecord` DROP COLUMN `profile_id`;

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `reviewRecord` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ReviewHistoryRecord` DROP COLUMN `review_id`;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_profileRecord_id_fkey` FOREIGN KEY (`profileRecord_id`) REFERENCES `ProfileHistoryRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_reviewRecord_fkey` FOREIGN KEY (`reviewRecord`) REFERENCES `ReviewHistoryRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteMovie` ADD CONSTRAINT `FavoriteMovie_movieRecord_fkey` FOREIGN KEY (`movieRecord`) REFERENCES `FavoriteMovieHistoryRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteTvShow` ADD CONSTRAINT `FavoriteTvShow_tvshowRecord_fkey` FOREIGN KEY (`tvshowRecord`) REFERENCES `FavoriteTvShowHistoryRecord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
