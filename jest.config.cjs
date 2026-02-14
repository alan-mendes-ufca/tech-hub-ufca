// informa de forma manual o arquivo .env que será carregado
const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

// Function factory
const creatJestConfig = nextJest({
  dir: ".",
});

const jestConfig = creatJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

// next/jest sobrescreve o transformIgnorePatterns internamente,
// então precisamos modificar a config DEPOIS que ela é gerada.
module.exports = async () => {
  const config = await jestConfig();

  config.transformIgnorePatterns = [
    "/node_modules/(?!(node-pg-migrate|glob)/)",
  ];

  return config;
};
