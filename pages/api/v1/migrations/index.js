import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import db from "infra/database";

const MIGRATIONS_DIR = join("infra", "migrations");

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method))
    return response.status(405).json({
      error: `Method ${request.method} not allowed`,
    });

  let dbClient;

  try {
    dbClient = await db.getNewClient();

    const isDryRun = request.method === "GET";

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
      console.log("RESULT: ", result);
      return response.status(201).json({
        appliedMigrations: result,
      });
    } else {
      return response.status(200).json({
        appliedMigrations: [],
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
