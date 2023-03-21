/*
  Warnings:

  - You are about to alter the column `price` on the `AppointmentDetails` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `servicePrice` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `AppointmentDetails` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `servicePrice` DOUBLE NOT NULL;
