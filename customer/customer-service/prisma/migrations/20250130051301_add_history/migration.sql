-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CustomerHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL
);
INSERT INTO "new_CustomerHistory" ("address", "createAt", "customerId", "id", "name", "rank", "version") SELECT "address", "createAt", "customerId", "id", "name", "rank", "version" FROM "CustomerHistory";
DROP TABLE "CustomerHistory";
ALTER TABLE "new_CustomerHistory" RENAME TO "CustomerHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
