/*
  Warnings:

  - You are about to drop the column `movie_poster_id` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `movie_title` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to alter the column `movie_id` on the `FavoriteMovie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to drop the column `tvShow_id` on the `FavoriteTvShow` table. All the data in the column will be lost.
  - You are about to drop the column `tvShow_poster_id` on the `FavoriteTvShow` table. All the data in the column will be lost.
  - You are about to drop the column `tvShow_title` on the `FavoriteTvShow` table. All the data in the column will be lost.
  - Added the required column `poster_path` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `FavoriteTvShow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `FavoriteTvShow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tv_id` to the `FavoriteTvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FavoriteMovie` DROP COLUMN `movie_poster_id`,
    DROP COLUMN `movie_title`,
    ADD COLUMN `poster_path` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(100) NOT NULL,
    MODIFY `movie_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FavoriteTvShow` DROP COLUMN `tvShow_id`,
    DROP COLUMN `tvShow_poster_id`,
    DROP COLUMN `tvShow_title`,
    ADD COLUMN `poster_path` VARCHAR(191) NOT NULL,
    ADD COLUMN `title` VARCHAR(100) NOT NULL,
    ADD COLUMN `tv_id` INTEGER NOT NULL;
