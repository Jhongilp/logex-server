/*
  Warnings:

  - You are about to drop the column `destination_country` on the `Expo` table. All the data in the column will be lost.
  - You are about to drop the column `puerto_destino` on the `Expo` table. All the data in the column will be lost.
  - You are about to drop the column `selected_shipping` on the `Expo` table. All the data in the column will be lost.
  - You are about to drop the column `transport_mode` on the `Expo` table. All the data in the column will be lost.
  - Added the required column `shippingId` to the `Expo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expo" DROP COLUMN "destination_country",
DROP COLUMN "puerto_destino",
DROP COLUMN "selected_shipping",
DROP COLUMN "transport_mode",
ADD COLUMN     "shippingId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expo" ADD CONSTRAINT "Expo_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "Shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
