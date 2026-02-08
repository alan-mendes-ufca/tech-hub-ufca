import retry from "async-retry";
import db from "../infra/database.js";
import migrator from "../models/migrator.js";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer(
    maxRetries = 100,
    // minTimeout = 500,
    maxTimeout = 1000,
  ) {
    return retry(fetchStatusPage, {
      retries: maxRetries,
      // minTimeout: minTimeout,
      maxTimeout: maxTimeout,
      onRetry: (error, attempt) => {
        console.log(
          `Attempt: ${attempt} - Failed to fetch status page: ${error.message}`,
        );
      },
    });

    async function fetchStatusPage() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/status");
        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      } catch (error) {
        console.error("Não foi possível buscar a páguina de status: ", error);
        throw error;
      }
    }
  }
}

async function clearDB() {
  await db.query("DROP schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPedingMigrations();
}

async function totalAppliedMigrations() {
  return (await db.query('SELECT COUNT(*) FROM  "public"."pg-migrations";'))
    .rows[0].count;
}

const orchestrator = {
  waitForAllServices,
  clearDB,
  runPendingMigrations,
  totalAppliedMigrations,
};
export default orchestrator;
