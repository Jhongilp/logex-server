/*
  Warnings:

  - The primary key for the `Expo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Shipping` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Expo" DROP CONSTRAINT "Expo_shippingId_fkey";

-- AlterTable
ALTER TABLE "Expo" DROP CONSTRAINT "Expo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "shippingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Expo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Expo_id_seq";

-- AlterTable
ALTER TABLE "Shipping" DROP CONSTRAINT "Shipping_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Shipping_id_seq";

-- AddForeignKey
ALTER TABLE "Expo" ADD CONSTRAINT "Expo_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "Shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
