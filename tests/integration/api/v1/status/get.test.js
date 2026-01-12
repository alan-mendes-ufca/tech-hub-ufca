import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET to /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      // updateAt tests
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      // database version test
      expect(responseBody.dependencies.database.version).toEqual("16.0");

      // database max connections test
      expect(responseBody.dependencies.database.max_connections).toEqual(100);

      // database apened connections test
      expect(responseBody.dependencies.database.oponed_connections).toEqual(1);
    });
  });
});
