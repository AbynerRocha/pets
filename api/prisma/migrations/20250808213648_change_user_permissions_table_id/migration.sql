-- CreateTable
CREATE TABLE `tb_users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_permissions` (
    `permission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_user_permissions` (
    `user_permission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `gaveAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gaveBy` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_user_permissions` ADD CONSTRAINT `tb_user_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tb_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user_permissions` ADD CONSTRAINT `tb_user_permissions_user_permission_id_fkey` FOREIGN KEY (`user_permission_id`) REFERENCES `tb_permissions`(`permission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
