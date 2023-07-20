/*
  Warnings:

  - You are about to drop the column `credential` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_credential_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `credential`;
