-- CreateEnum
CREATE TYPE "TableRole" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "authServiceId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableSeat" (
    "id" TEXT NOT NULL,
    "role" "TableRole" NOT NULL DEFAULT 'GUEST',
    "memberId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "memberFullName" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_authServiceId_key" ON "Member"("authServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "TableSeat_id_key" ON "TableSeat"("id");

-- CreateIndex
CREATE INDEX "TableSeat_memberId_idx" ON "TableSeat"("memberId");

-- CreateIndex
CREATE INDEX "TableSeat_tableId_idx" ON "TableSeat"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "Table_inviteCode_key" ON "Table"("inviteCode");

-- CreateIndex
CREATE INDEX "Channel_tableId_idx" ON "Channel"("tableId");

-- CreateIndex
CREATE INDEX "Message_channelId_idx" ON "Message"("channelId");

-- CreateIndex
CREATE INDEX "Message_memberId_idx" ON "Message"("memberId");
