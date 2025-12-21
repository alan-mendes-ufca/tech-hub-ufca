import migrationRunner from "node-pg-migrate";
import { join } from "node:path"; // Dados sistema rodando a aplicação, permite passar o caminho para os diretórios de forma consistente
import db from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method))
    return response.status(405).json({
      error: `Method ${request.method} not allowed`,
    });

  let dbClient;
  try {
    dbClient = await db.getNewClient();

    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pg-migrations",
    };

    if (request.method === "GET") {
      const migrations = {
        pendingMigrations: await migrationRunner({
          ...defaultMigrationsOptions,
        }),
      };
      return response.status(200).json(migrations);
    }

    if (request.method === "POST") {
      const migrations = {
        appliedMigrations:
          (await migrationRunner({
            ...defaultMigrationsOptions,
            dryRun: false,
          })) ?? [],
      };

      if (migrations.appliedMigrations.length > 0) {
        return response.status(201).json(migrations);
      }
      return response.status(200).json(migrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
