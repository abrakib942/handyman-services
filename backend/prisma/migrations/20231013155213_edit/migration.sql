/*
  Warnings:

  - You are about to drop the column `image` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "image",
ADD COLUMN     "images" TEXT[];
