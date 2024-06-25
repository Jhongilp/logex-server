/*
  Warnings:

  - The `status` column on the `Expo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Expo" DROP COLUMN "status",
ADD COLUMN     "status" "ExpoStatus" NOT NULL DEFAULT 'PREVIO_CARGUE';
