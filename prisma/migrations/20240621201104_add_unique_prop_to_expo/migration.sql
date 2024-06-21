/*
  Warnings:

  - The primary key for the `Expo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[consecutivo]` on the table `Expo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ExpoTodoActivity" DROP CONSTRAINT "ExpoTodoActivity_expoId_company_nit_fkey";

-- AlterTable
ALTER TABLE "Expo" DROP CONSTRAINT "Expo_pkey",
ADD CONSTRAINT "Expo_pkey" PRIMARY KEY ("consecutivo");

-- CreateIndex
CREATE UNIQUE INDEX "Expo_consecutivo_key" ON "Expo"("consecutivo");

-- AddForeignKey
ALTER TABLE "ExpoTodoActivity" ADD CONSTRAINT "ExpoTodoActivity_expoId_fkey" FOREIGN KEY ("expoId") REFERENCES "Expo"("consecutivo") ON DELETE RESTRICT ON UPDATE CASCADE;
