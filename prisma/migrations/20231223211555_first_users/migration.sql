-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expo" DROP CONSTRAINT "Expo_userId_fkey";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Expo" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nit" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Expo" ADD CONSTRAINT "Expo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;
