-- AlterTable
ALTER TABLE "Cost" ADD COLUMN     "groupId" TEXT;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
