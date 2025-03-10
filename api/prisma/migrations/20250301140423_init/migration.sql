/*
  Warnings:

  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "birthDate" SET NOT NULL;
