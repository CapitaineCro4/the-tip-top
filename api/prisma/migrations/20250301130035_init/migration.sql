/*
  Warnings:

  - You are about to drop the column `gameId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `ticketId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_gameId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "ticketId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "gameId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "used",
DROP COLUMN "userId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
