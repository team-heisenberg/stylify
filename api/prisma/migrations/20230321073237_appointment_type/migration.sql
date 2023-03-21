-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `appointmentType` ENUM('ONLINE', 'CALL', 'WALKIN') NOT NULL DEFAULT 'ONLINE';
