/*
  Warnings:

  - You are about to drop the `_CostAssignmentToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `CostAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CostAssignmentToUser" DROP CONSTRAINT "_CostAssignmentToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CostAssignmentToUser" DROP CONSTRAINT "_CostAssignmentToUser_B_fkey";

-- AlterTable
ALTER TABLE "CostAssignment" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CostAssignmentToUser";

-- AddForeignKey
ALTER TABLE "CostAssignment" ADD CONSTRAINT "CostAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
