-- AlterTable
ALTER TABLE `Professional` ADD COLUMN `photoURL` VARCHAR(191) NOT NULL DEFAULT 'https://i.pravatar.cc/300';

-- CreateTable
CREATE TABLE `TimeSlot` (
    `timeSlotID` INTEGER NOT NULL AUTO_INCREMENT,
    `professionalID` INTEGER NOT NULL,
    `slot` VARCHAR(191) NOT NULL,

    INDEX `TimeSlot_professionalID_idx`(`professionalID`),
    PRIMARY KEY (`timeSlotID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
