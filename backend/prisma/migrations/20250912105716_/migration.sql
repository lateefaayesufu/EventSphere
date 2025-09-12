-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "mainImage" TEXT;

-- CreateTable
CREATE TABLE "public"."session" (
    "sid" VARCHAR(255) NOT NULL,
    "sess" JSONB NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);
