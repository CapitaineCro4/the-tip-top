/*
  Warnings:

  - You are about to drop the column `remaining` on the `Gain` table. All the data in the column will be lost.
  - You are about to drop the column `totalQuantity` on the `Gain` table. All the data in the column will be lost.
  - You are about to drop the column `usedAt` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantityGain` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gain" DROP COLUMN "remaining",
DROP COLUMN "totalQuantity";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "usedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalQuantityGain" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
