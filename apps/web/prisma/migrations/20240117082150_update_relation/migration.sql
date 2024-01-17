/*
  Warnings:

  - You are about to drop the `hrml_storage_mappings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `check_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "check_requests" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "hrml_storage_mappings";

-- CreateTable
CREATE TABLE "html_storage_mappings" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "storageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "html_storage_mappings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "check_requests" ADD CONSTRAINT "check_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "html_storage_mappings" ADD CONSTRAINT "html_storage_mappings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
