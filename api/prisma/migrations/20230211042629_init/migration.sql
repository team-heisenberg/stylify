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
