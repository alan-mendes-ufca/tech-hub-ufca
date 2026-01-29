import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import db from "infra/database";
import controller from "infra/controller";

const MIGRATIONS_DIR = resolve("infra", "migrations");

const router = createRouter();

router.get(getHandler).post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const isDryRun = true;
  createMigrationHandler(request, response, isDryRun);
}

async function postHandler(request, response) {
  const isDryRun = false;
  createMigrationHandler(request, response, isDryRun);
}

async function createMigrationHandler(request, response, isDryRun) {
  let dbClient;

  try {
    dbClient = await db.getNewClient();

    const result = await migrationRunner({
      dbClient: dbClient,
      dryRun: isDryRun,
      dir: MIGRATIONS_DIR,
      direction: "up",
      verbose: true,
      migrationsTable: "pg-migrations",
    });

    if (isDryRun) {
      return response.status(200).json({
        pendingMigrations: result ?? [],
      });
    } else if (!isDryRun && result.length > 0) {
      return response.status(201).json({
        appliedMigrations: result,
      });
    } else {
      return response.status(200).json({
        appliedMigrations: [],
      });
    }
  } finally {
    await dbClient.end();
  }
}
