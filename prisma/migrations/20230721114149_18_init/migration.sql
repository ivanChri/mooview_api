-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_author_id_fkey`;

-- AlterTable
ALTER TABLE `Review` MODIFY `review` VARCHAR(3000) NOT NULL;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
