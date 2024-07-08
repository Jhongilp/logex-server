-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('DRY_20', 'DRY_40', 'DRY_40HC', 'REEFER_20', 'REEFER_40', 'REEFER_40HC');

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "expoId" TEXT NOT NULL,
    "containerNumber" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "transportName" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "type" "ContainerType" NOT NULL,
    "dateWithdrawal" TIMESTAMP(3),
    "dateLoad" TIMESTAMP(3),
    "datePortEntry" TIMESTAMP(3),
    "dateSail" TIMESTAMP(3),
    "netWeight" INTEGER NOT NULL,
    "grossWeight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
