/*
  Warnings:

  - You are about to drop the column `picture` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "picture";

-- DropTable
DROP TABLE "accounts";
