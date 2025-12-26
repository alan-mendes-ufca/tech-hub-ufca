const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    function (error, stdout) {
      if (stdout.search("accepting connections") == -1) {
        process.stdout.write(".");
        return checkPostgres();
      }

      console.log("\n\n🟢 Postgres está pronto e aceitando coneções.");
    },
  );
}

process.stdout.write("\n\n🔴 Aguardando postgres aceitar conexões.");
checkPostgres();
