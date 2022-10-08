/*
  Warnings:

  - You are about to drop the column `replyTo` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_replyTo_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_commentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "replyTo";

-- DropTable
DROP TABLE "Vote";
