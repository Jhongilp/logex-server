-- AlterTable
ALTER TABLE "DefaultExpoActivity" ADD COLUMN     "company_nit" TEXT;

-- AddForeignKey
ALTER TABLE "DefaultExpoActivity" ADD CONSTRAINT "DefaultExpoActivity_company_nit_fkey" FOREIGN KEY ("company_nit") REFERENCES "Company"("nit") ON DELETE SET NULL ON UPDATE CASCADE;
