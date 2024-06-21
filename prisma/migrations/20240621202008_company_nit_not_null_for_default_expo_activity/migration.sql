/*
  Warnings:

  - Made the column `company_nit` on table `DefaultExpoActivity` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DefaultExpoActivity" DROP CONSTRAINT "DefaultExpoActivity_company_nit_fkey";

-- AlterTable
ALTER TABLE "DefaultExpoActivity" ALTER COLUMN "company_nit" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "DefaultExpoActivity" ADD CONSTRAINT "DefaultExpoActivity_company_nit_fkey" FOREIGN KEY ("company_nit") REFERENCES "Company"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;
