-- CreateTable
CREATE TABLE "DefaultExpoActivity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "responsible" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "enabled" BOOLEAN NOT NULL,

    CONSTRAINT "DefaultExpoActivity_pkey" PRIMARY KEY ("id")
);
