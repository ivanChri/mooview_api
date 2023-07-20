/*
  Warnings:

  - Added the required column `movie_poster_id` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tvShow_poster_id` to the `FavoriteTvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FavoriteMovie` ADD COLUMN `movie_poster_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteTvShow` ADD COLUMN `tvShow_poster_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `History` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
