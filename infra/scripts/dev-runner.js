const { spawn } = require("node:child_process");

const START_COMMAND = "npm run dev:build";
const STOP_COMMAND = "npm run services:down";

function runServer() {
  spawn(START_COMMAND, {
    stdio: "inherit",
    shell: true,
  });
}

function closeServer() {
  console.log("\n🛑 Encerrando servidor...");
  spawn(STOP_COMMAND, {
    stdio: "inherit",
    shell: true,
  });
}

runServer();

process.on("SIGTERM", closeServer);
process.on("SIGINT", closeServer);
