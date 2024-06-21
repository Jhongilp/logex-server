-- CreateEnum
CREATE TYPE "ExpoStatus" AS ENUM ('PREVIO_CARGUE', 'TRANSITO_PUERTO', 'EN_PUERTO', 'TRANSITO_INTERNACIONAL', 'EN_DESTINO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('SIN_INICIAR', 'EN_CURSO', 'EN_ESPERA', 'RETRASADO', 'COMPLETADO');

-- CreateTable
CREATE TABLE "Company" (
    "nit" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("nit")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT,
    "first_lastname" TEXT NOT NULL,
    "second_lastname" TEXT,
    "role" INTEGER,
    "company_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "company_nit" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipping" (
    "id" TEXT NOT NULL,
    "consignee" TEXT NOT NULL,
    "notify" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "transport_mode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expo" (
    "consecutivo" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "globalProgress" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shippingId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "company_nit" TEXT NOT NULL,

    CONSTRAINT "Expo_pkey" PRIMARY KEY ("consecutivo","company_nit")
);

-- CreateTable
CREATE TABLE "ExpoTodoActivity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ExpoStatus" NOT NULL DEFAULT 'PREVIO_CARGUE',
    "progress" "ProgressStatus" NOT NULL DEFAULT 'SIN_INICIAR',
    "responsible" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "completedAt" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "expoId" TEXT NOT NULL,
    "company_nit" TEXT NOT NULL,

    CONSTRAINT "ExpoTodoActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DefaultExpoActivity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ExpoStatus" NOT NULL DEFAULT 'PREVIO_CARGUE',
    "progress" "ProgressStatus" NOT NULL DEFAULT 'SIN_INICIAR',
    "responsible" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "company_nit" TEXT,

    CONSTRAINT "DefaultExpoActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_company_nit_fkey" FOREIGN KEY ("company_nit") REFERENCES "Company"("nit") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipping" ADD CONSTRAINT "Shipping_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expo" ADD CONSTRAINT "Expo_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "Shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expo" ADD CONSTRAINT "Expo_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expo" ADD CONSTRAINT "Expo_company_nit_fkey" FOREIGN KEY ("company_nit") REFERENCES "Company"("nit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpoTodoActivity" ADD CONSTRAINT "ExpoTodoActivity_expoId_company_nit_fkey" FOREIGN KEY ("expoId", "company_nit") REFERENCES "Expo"("consecutivo", "company_nit") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefaultExpoActivity" ADD CONSTRAINT "DefaultExpoActivity_company_nit_fkey" FOREIGN KEY ("company_nit") REFERENCES "Company"("nit") ON DELETE SET NULL ON UPDATE CASCADE;
