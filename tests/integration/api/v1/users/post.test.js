import orchestrator from "tests/orchestrator";
import database from "infra/database";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDB();
  await orchestrator.runPedingMigrations();
});

describe("POST to /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      await database.query({
        text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
        values: ["alanmendes", "alan.mendes@aluno.ufca.edu.br", "5520240f17"],
      });

      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
      });

      const users = await database.query("SELECT * FROM users;");
      console.log(users.rows);

      expect(response.status).toBe(201);
      const responseBody = await response.json();
      expect(typeof responseBody).toBe("object");
    });
  });
});
