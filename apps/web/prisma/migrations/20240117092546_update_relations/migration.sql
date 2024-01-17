/*
  Warnings:

  - You are about to drop the column `userId` on the `html_storage_mappings` table. All the data in the column will be lost.
  - You are about to drop the `check_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_requests" DROP CONSTRAINT "check_requests_userId_fkey";

-- DropForeignKey
ALTER TABLE "html_storage_mappings" DROP CONSTRAINT "html_storage_mappings_userId_fkey";

-- AlterTable
ALTER TABLE "html_storage_mappings" DROP COLUMN "userId";

-- DropTable
DROP TABLE "check_requests";

-- DropTable
DROP TABLE "users";
