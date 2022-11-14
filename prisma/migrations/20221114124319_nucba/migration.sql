/*
  Warnings:

  - Added the required column `totalBills` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalBills" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Bills" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
