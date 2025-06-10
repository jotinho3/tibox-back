-- AlterTable
ALTER TABLE "Idea" ADD COLUMN     "votedBy" TEXT[] DEFAULT ARRAY[]::TEXT[];
