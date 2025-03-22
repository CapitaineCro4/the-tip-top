-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "isDelivered" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "totalQuantityGain" SET DEFAULT 1;
