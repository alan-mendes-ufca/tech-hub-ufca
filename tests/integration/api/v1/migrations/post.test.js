import db from "infra/database";

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  // 201 - Created.
  expect(response.status).toBe(201);
  const responseBody = await response.json();
  expect(typeof responseBody).toBe("object");

  // #1: Deve retornar uma lista com as migrations rodadas.
  expect(responseBody.appliedMigrations.length).toBeGreaterThan(0);

  // Validando o número de linhas do pg-migrations, sendo maior que zero a migration foi executada.
  expect(
    parseInt(
      (await db.query('SELECT COUNT(*) FROM "public"."pg-migrations";')).rows[0]
        .count,
    ),
  ).toBeGreaterThan(0);

  // -------------------------------------------------------------------------------------------------------

  // #2: retorna uma lista vazia []
  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  // 200 ok.
  expect(response2.status).toBe(200);

  const responseBody2 = await response2.json();
  expect(typeof responseBody2).toBe("object");

  console.log("responseBody2:", responseBody2);
  console.log("appliedMigrations:", responseBody2.appliedMigrations);

  // Validando se a lista é vazia, ou seja length == 0
  expect(responseBody2.appliedMigrations.length).toBe(0);
});
