import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDB();
});

describe("DELETE to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Validate MethodNotAllowedError", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "DELETE",
      });

      expect(response.status).toEqual(405);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpoint.",
        action: "Verifique se o método HTTP enviado para esse endpoint.",
        status_code: 405,
      });
    });
  });
});
