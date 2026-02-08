import orchestrator from "../../../../../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDB();
  await orchestrator.runPendingMigrations();
});

describe("GET to /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      const insertedUserResponse = await fetch(
        "http://localhost:3000/api/v1/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "alanmendes",
            email: "alan49931@gmail.com",
            password: "5520240f17",
          }),
        },
      );
      const insertedUser = await insertedUserResponse.json();
      const response = await fetch(
        "http://localhost:3000/api/v1/users/alanmendes",
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        ...insertedUser,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
    });
    test("With case mismatch", async () => {
      const insertedUserResponse = await fetch(
        "http://localhost:3000/api/v1/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "CaseDiferente",
            email: "CaseDiferente@gmail.com",
            password: "5520240f17",
          }),
        },
      );
      const insertedUser = await insertedUserResponse.json();
      const response = await fetch(
        "http://localhost:3000/api/v1/users/casediferente",
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        ...insertedUser,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
    });
    test("With invalid 'username'", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/invalidUser",
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "Usuário não encontrado.",
        action: "Registre um usuário ou digite um username válido.",
        status_code: 404,
      });
    });
    test("With empty 'username'", async () => {
      const response = await fetch("http://localhost:3000/api/v1/users/");
      expect(response.status).toBe(405);
    });
  });
});
