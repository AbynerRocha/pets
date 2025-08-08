/*
  Warnings:

  - The primary key for the `tb_user_permissions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_permission_id` on the `tb_user_permissions` table. All the data in the column will be lost.
  - Added the required column `id` to the `tb_user_permissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permissionId` to the `tb_user_permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_user_permissions` DROP FOREIGN KEY `tb_user_permissions_user_permission_id_fkey`;

-- AlterTable
ALTER TABLE `tb_user_permissions` DROP PRIMARY KEY,
    DROP COLUMN `user_permission_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `permissionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `tb_user_permissions` ADD CONSTRAINT `tb_user_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `tb_permissions`(`permission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
