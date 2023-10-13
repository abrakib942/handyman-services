/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workTypeId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workTypeId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_serviceId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "workTypeId" TEXT NOT NULL,
ALTER COLUMN "serviceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "serviceId",
ADD COLUMN     "workTypeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "workTypeId" TEXT;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "images",
DROP COLUMN "price",
ADD COLUMN     "heading" TEXT,
ADD COLUMN     "image" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "WorkType" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkType" ADD CONSTRAINT "WorkType_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_workTypeId_fkey" FOREIGN KEY ("workTypeId") REFERENCES "WorkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
