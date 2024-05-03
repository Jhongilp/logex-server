/*
  Warnings:

  - You are about to drop the column `indicatator_month` on the `Expo` table. All the data in the column will be lost.
  - You are about to drop the column `oc` on the `Expo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Expo" DROP COLUMN "indicatator_month",
DROP COLUMN "oc";
