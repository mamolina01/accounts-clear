/*
  Warnings:

  - Made the column `participantId` on table `CostAssignment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CostAssignment" DROP CONSTRAINT "CostAssignment_participantId_fkey";

-- AlterTable
ALTER TABLE "CostAssignment" ALTER COLUMN "participantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CostAssignment" ADD CONSTRAINT "CostAssignment_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
