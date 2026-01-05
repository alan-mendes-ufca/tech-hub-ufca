import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDB();
});

describe("POST to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(response.status).toBe(201);
        const responseBody = await response.json();
        expect(typeof responseBody).toBe("object");

        // #1: Deve retornar uma lista com as migrations rodadas.
        expect(responseBody.appliedMigrations.length).toBeGreaterThan(0);

        // Validando o número de linhas do pg-migrations, sendo maior que zero a migration foi executada.
        expect(
          parseInt(await orchestrator.totalAppliedMigrations()),
        ).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const response2 = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        // 200 ok.
        expect(response2.status).toBe(200);

        const responseBody2 = await response2.json();
        expect(typeof responseBody2).toBe("object");

        // Validando se a lista é vazia, ou seja length == 0
        expect(responseBody2.appliedMigrations.length).toBe(0);
      });
    });
  });
});
