import orchestrator from "tests/orchestrator.js";

/*
- O Jest@10.8.2 não suporta o `ECMAScript Modules (ESM)`! Diferente mente do next.js, 
 que utiliza um compilador `swc` para transpilar seu código moderno, para versões anteriores. 
 Além de muitas outras configurações fornecida pelo next.js.

- Vamos fornecer os recursos do next.js para o Jest por meio do jest.config.js - arquivo de configuração especial.

- Desafio 1: provar que o jest de fato está rodando no ambiente de testes, env.development não são carregas.
- Desafio 2: conseguir carregar essa variáveis no banco de dados.

*/

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDB();
});

describe("GET to /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pedding migrations", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response1.status).toBe(200);

      const responseBody1 = await response1.json();

      expect(typeof responseBody1).toBe("object");
      expect(responseBody1.pendingMigrations.length).toBeGreaterThan(0);
      expect(await orchestrator.totalAppliedMigrations()).toEqual("0");
    });
  });
});
