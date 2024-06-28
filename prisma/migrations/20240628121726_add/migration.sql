/*
  Warnings:

  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
