-- CreateEnum
CREATE TYPE "SEVERITY_TYPES" AS ENUM ('high', 'low', 'medium');

-- CreateTable
CREATE TABLE "AttackCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "severity" "SEVERITY_TYPES" NOT NULL,

    CONSTRAINT "AttackCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttackSubCategory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "attackCategoryId" TEXT NOT NULL,

    CONSTRAINT "AttackSubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "averageSeverity" "SEVERITY_TYPES" NOT NULL,
    "trustedIpPercentage" INTEGER NOT NULL,
    "mostVulnerablePort" TEXT NOT NULL,
    "mostCommonAttackId" TEXT NOT NULL,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttackCount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "count" INTEGER NOT NULL,
    "attackId" TEXT NOT NULL,

    CONSTRAINT "AttackCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttackCategory_name_key" ON "AttackCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AttackSubCategory_name_key" ON "AttackSubCategory"("name");

-- AddForeignKey
ALTER TABLE "AttackSubCategory" ADD CONSTRAINT "AttackSubCategory_attackCategoryId_fkey" FOREIGN KEY ("attackCategoryId") REFERENCES "AttackCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Snapshot" ADD CONSTRAINT "Snapshot_mostCommonAttackId_fkey" FOREIGN KEY ("mostCommonAttackId") REFERENCES "AttackCount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttackCount" ADD CONSTRAINT "AttackCount_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "AttackCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
