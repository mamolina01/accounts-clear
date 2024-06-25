/*
  Warnings:

  - You are about to drop the column `userId` on the `CostAssignment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CostAssignment" DROP CONSTRAINT "CostAssignment_userId_fkey";

-- AlterTable
ALTER TABLE "CostAssignment" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_CostAssignmentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CostAssignmentToUser_AB_unique" ON "_CostAssignmentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CostAssignmentToUser_B_index" ON "_CostAssignmentToUser"("B");

-- AddForeignKey
ALTER TABLE "_CostAssignmentToUser" ADD CONSTRAINT "_CostAssignmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "CostAssignment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostAssignmentToUser" ADD CONSTRAINT "_CostAssignmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
