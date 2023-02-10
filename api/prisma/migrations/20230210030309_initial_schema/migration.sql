/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Test`;

-- CreateTable
CREATE TABLE `Business` (
    `businessID` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `businessName` VARCHAR(191) NOT NULL,
    `businessType` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Business_email_key`(`email`),
    PRIMARY KEY (`businessID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professional` (
    `professionalID` INTEGER NOT NULL AUTO_INCREMENT,
    `businessID` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`professionalID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `serviceID` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceName` VARCHAR(191) NOT NULL,
    `serviceTypeID` INTEGER NOT NULL,
    `servicePrice` INTEGER NOT NULL,
    `businessID` INTEGER NOT NULL,
    `professionalID` INTEGER NOT NULL,

    PRIMARY KEY (`serviceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfessionalServices` (
    `professionalServicesID` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceID` INTEGER NOT NULL,
    `professionalID` INTEGER NOT NULL,

    PRIMARY KEY (`professionalServicesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceType` (
    `serviceTypeID` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`serviceTypeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Deal` (
    `dealID` INTEGER NOT NULL AUTO_INCREMENT,
    `dealAmount` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `businessID` INTEGER NOT NULL,
    `serviceID` INTEGER NOT NULL,

    PRIMARY KEY (`dealID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `reviewID` INTEGER NOT NULL AUTO_INCREMENT,
    `appointmentRating` INTEGER NOT NULL,
    `reviewDetails` VARCHAR(191) NOT NULL,
    `businessID` INTEGER NOT NULL,
    `appointmentID` INTEGER NOT NULL,

    PRIMARY KEY (`reviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `appointmentID` INTEGER NOT NULL AUTO_INCREMENT,
    `customerID` INTEGER NOT NULL,
    `businessID` INTEGER NOT NULL,
    `professionalID` INTEGER NOT NULL,
    `isConfirmed` BOOLEAN NOT NULL,
    `dealID` INTEGER NOT NULL,
    `appointmentDateTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`appointmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppointmentDetails` (
    `appointmentDetailsID` INTEGER NOT NULL AUTO_INCREMENT,
    `appointmentID` INTEGER NOT NULL,
    `serviceID` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`appointmentDetailsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `customerID` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `avatarURL` VARCHAR(191) NOT NULL,
    `businessBusinessID` INTEGER NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`customerID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Professional` ADD CONSTRAINT `Professional_businessID_fkey` FOREIGN KEY (`businessID`) REFERENCES `Business`(`businessID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_businessID_fkey` FOREIGN KEY (`businessID`) REFERENCES `Business`(`businessID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_serviceTypeID_fkey` FOREIGN KEY (`serviceTypeID`) REFERENCES `ServiceType`(`serviceTypeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessionalServices` ADD CONSTRAINT `ProfessionalServices_serviceID_fkey` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`serviceID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfessionalServices` ADD CONSTRAINT `ProfessionalServices_professionalID_fkey` FOREIGN KEY (`professionalID`) REFERENCES `Professional`(`professionalID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_businessID_fkey` FOREIGN KEY (`businessID`) REFERENCES `Business`(`businessID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deal` ADD CONSTRAINT `Deal_serviceID_fkey` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`serviceID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_businessID_fkey` FOREIGN KEY (`businessID`) REFERENCES `Business`(`businessID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_appointmentID_fkey` FOREIGN KEY (`appointmentID`) REFERENCES `Appointment`(`appointmentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_customerID_fkey` FOREIGN KEY (`customerID`) REFERENCES `Customer`(`customerID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_businessID_fkey` FOREIGN KEY (`businessID`) REFERENCES `Business`(`businessID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_professionalID_fkey` FOREIGN KEY (`professionalID`) REFERENCES `Professional`(`professionalID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_dealID_fkey` FOREIGN KEY (`dealID`) REFERENCES `Deal`(`dealID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentDetails` ADD CONSTRAINT `AppointmentDetails_appointmentID_fkey` FOREIGN KEY (`appointmentID`) REFERENCES `Appointment`(`appointmentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentDetails` ADD CONSTRAINT `AppointmentDetails_serviceID_fkey` FOREIGN KEY (`serviceID`) REFERENCES `Service`(`serviceID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_businessBusinessID_fkey` FOREIGN KEY (`businessBusinessID`) REFERENCES `Business`(`businessID`) ON DELETE SET NULL ON UPDATE CASCADE;
