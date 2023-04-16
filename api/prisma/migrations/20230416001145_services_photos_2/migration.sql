/*
  Warnings:

  - Made the column `photoURL` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Service` MODIFY `photoURL` VARCHAR(191) NOT NULL;
