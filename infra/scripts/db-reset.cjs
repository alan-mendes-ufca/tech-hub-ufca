// infra/scripts/db-reset.cjs
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const envConfig = dotenv.config({ path: ".env.development" });
dotenvExpand.expand(envConfig);

async function resetDB() {
  try {
    console.log("🔴 Limpando o banco de dados...");
    const modulo = await import("../../tests/orchestrator.js");

    const orchestrator = modulo.orchestrator || modulo.default;

    await orchestrator.clearDB();
    console.log("🟢 Limpo e pronto para rodar as migrations.");
  } catch (erro) {
    console.error("Erro:", erro);
    process.exit(1);
  }
}

if (process.env.NODE_ENV === "production") {
  console.error("❌ Script de limpeza não será executado em produção.");
  process.exit(0);
}

if (!["development", "test"].includes(process.env.NODE_ENV)) {
  console.warn(`⚠️  Resetando banco em ambiente: ${process.env.NODE_ENV}`);
}

resetDB();
