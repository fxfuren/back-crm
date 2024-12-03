/*
  Warnings:

  - You are about to drop the column `is_two_factor_enabled` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "completed_orders" ALTER COLUMN "completed_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "price" DOUBLE PRECISION DEFAULT 0.0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_two_factor_enabled";
