/*
  Warnings:

  - You are about to drop the column `userId` on the `Expo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expo" DROP CONSTRAINT "Expo_userId_fkey";

-- AlterTable
ALTER TABLE "Expo" DROP COLUMN "userId";
