-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Tower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" TEXT NOT NULL,
    "towerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Apartment_towerId_fkey" FOREIGN KEY ("towerId") REFERENCES "Tower" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResidentProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "phone" TEXT,
    "consentAt" DATETIME,
    CONSTRAINT "ResidentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ResidentProfile_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "apartmentId" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "carrier" TEXT NOT NULL,
    "trackingNumber" TEXT,
    "description" TEXT,
    "observations" TEXT,
    "status" TEXT NOT NULL DEFAULT 'RECIBIDO',
    "receivedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordedById" TEXT NOT NULL,
    CONSTRAINT "Package_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Package_recordedById_fkey" FOREIGN KEY ("recordedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PackageDelivery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    "receiverType" TEXT NOT NULL,
    "observations" TEXT,
    "deliveredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredById" TEXT NOT NULL,
    CONSTRAINT "PackageDelivery_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PackageDelivery_deliveredById_fkey" FOREIGN KEY ("deliveredById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuthorizedPerson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "residentProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "documentLast4" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "AuthorizedPerson_residentProfileId_fkey" FOREIGN KEY ("residentProfileId") REFERENCES "ResidentProfile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommonArea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "schedule" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "commonAreaId" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "slot" TEXT NOT NULL,
    "attendees" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "rejectionReason" TEXT,
    "approvedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reservation_commonAreaId_fkey" FOREIGN KEY ("commonAreaId") REFERENCES "CommonArea" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PQRS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticket" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'RECIBIDA',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PQRS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PQRSHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pqrsId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PQRSHistory_pqrsId_fkey" FOREIGN KEY ("pqrsId") REFERENCES "PQRS" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PQRSHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShiftNovelty" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'MEDIA',
    "followUp" BOOLEAN NOT NULL DEFAULT false,
    "followedAt" DATETIME,
    "followedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ShiftNovelty_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_active_idx" ON "User"("role", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Tower_name_key" ON "Tower"("name");

-- CreateIndex
CREATE INDEX "Apartment_number_idx" ON "Apartment"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_towerId_number_key" ON "Apartment"("towerId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "ResidentProfile_userId_key" ON "ResidentProfile"("userId");

-- CreateIndex
CREATE INDEX "ResidentProfile_apartmentId_idx" ON "ResidentProfile"("apartmentId");

-- CreateIndex
CREATE INDEX "Package_apartmentId_status_receivedAt_idx" ON "Package"("apartmentId", "status", "receivedAt");

-- CreateIndex
CREATE INDEX "Package_receivedAt_status_idx" ON "Package"("receivedAt", "status");

-- CreateIndex
CREATE UNIQUE INDEX "PackageDelivery_packageId_key" ON "PackageDelivery"("packageId");

-- CreateIndex
CREATE INDEX "AuthorizedPerson_residentProfileId_active_idx" ON "AuthorizedPerson"("residentProfileId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "CommonArea_name_key" ON "CommonArea"("name");

-- CreateIndex
CREATE INDEX "Reservation_commonAreaId_date_slot_status_idx" ON "Reservation"("commonAreaId", "date", "slot", "status");

-- CreateIndex
CREATE INDEX "Reservation_apartmentId_date_idx" ON "Reservation"("apartmentId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "PQRS_ticket_key" ON "PQRS"("ticket");

-- CreateIndex
CREATE INDEX "PQRS_userId_createdAt_idx" ON "PQRS"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "PQRS_status_createdAt_idx" ON "PQRS"("status", "createdAt");

-- CreateIndex
CREATE INDEX "PQRSHistory_pqrsId_createdAt_idx" ON "PQRSHistory"("pqrsId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_createdAt_idx" ON "AuditLog"("entity", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "AuditLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ShiftNovelty_createdAt_shift_idx" ON "ShiftNovelty"("createdAt", "shift");

-- CreateIndex
CREATE INDEX "ShiftNovelty_followUp_priority_idx" ON "ShiftNovelty"("followUp", "priority");


-- Prevent two approved reservations for the same zone, date, and time slot.
CREATE UNIQUE INDEX "Reservation_one_approved_slot" ON "Reservation"("commonAreaId", "date", "slot") WHERE "status" = 'APROBADA';
