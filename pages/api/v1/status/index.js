import db from "infra/database.js";
import { InternalServerError } from "infra/errors";

async function status(request, response) {
  try {
    response.status(200).json({
      updated_at: updatedAt(),
      dependencies: {
        database: {
          version: await databaseVersionResult(),
          max_connections: parseInt(await maxConnections()),
          oponed_connections: await opedConnectionsValues(),
        },
      },
    });
  } catch (err) {
    const publicErrorObject = new InternalServerError({
      cause: err,
    });
    console.log("\n Erro dentro do catch do controller");
    console.error(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}

function updatedAt() {
  // return ISO 8601 data format
  return new Date().toISOString();
}

async function databaseVersionResult() {
  return (await db.query("SHOW server_version;")).rows[0].server_version;
}

async function maxConnections() {
  return (await db.query("SHOW max_connections;")).rows[0].max_connections;
}

async function opedConnectionsValues() {
  return (
    // Querys parametrizadas
    (
      await db.query({
        text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
        values: [process.env.POSTGRES_DB],
      })
    ).rows[0].count
  );
}

export default status;
