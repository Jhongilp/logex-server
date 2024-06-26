-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "consignee" TEXT NOT NULL,
    "notify" TEXT NOT NULL,
    "shippingCompany" TEXT NOT NULL,
    "broker" TEXT NOT NULL,
    "transportMode" TEXT NOT NULL,
    "cityBondPort" TEXT NOT NULL,
    "bondPort" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "bookingNumber" TEXT NOT NULL,
    "billOfLandingId" TEXT NOT NULL,
    "vesselName" TEXT NOT NULL,
    "voyage" TEXT NOT NULL,
    "eta" TIMESTAMP(3),
    "etd" TIMESTAMP(3),
    "etaDestination" TIMESTAMP(3),
    "documentsDeadline" TIMESTAMP(3),
    "inPortDeadline" TIMESTAMP(3),
    "rollover" BOOLEAN,
    "expoId" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_expoId_key" ON "Booking"("expoId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_expoId_fkey" FOREIGN KEY ("expoId") REFERENCES "Expo"("consecutivo") ON DELETE RESTRICT ON UPDATE CASCADE;
