-- CreateEnum
CREATE TYPE "ExpoStatus" AS ENUM ('PREVIO_CARGUE', 'TRANSITO_PUERTO', 'EN_PUERTO', 'TRANSITO_INTERNACIONAL', 'EN_DESTINO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "ProgressStatus" AS ENUM ('SIN_INICIAR', 'EN_CURSO', 'EN_ESPERA', 'RETRASADO', 'COMPLETADO');

-- CreateTable
CREATE TABLE "ExpoTodoActivity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "ExpoStatus" NOT NULL DEFAULT 'PREVIO_CARGUE',
    "progress" "ProgressStatus" NOT NULL DEFAULT 'SIN_INICIAR',
    "responsible" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "expoId" TEXT,

    CONSTRAINT "ExpoTodoActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExpoTodoActivity" ADD CONSTRAINT "ExpoTodoActivity_expoId_fkey" FOREIGN KEY ("expoId") REFERENCES "Expo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
