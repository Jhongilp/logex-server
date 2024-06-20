/*
  Warnings:

  - The `status` column on the `DefaultExpoActivity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `progress` column on the `DefaultExpoActivity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DefaultExpoActivity" DROP COLUMN "status",
ADD COLUMN     "status" "ExpoStatus" NOT NULL DEFAULT 'PREVIO_CARGUE',
DROP COLUMN "progress",
ADD COLUMN     "progress" "ProgressStatus" NOT NULL DEFAULT 'SIN_INICIAR';
