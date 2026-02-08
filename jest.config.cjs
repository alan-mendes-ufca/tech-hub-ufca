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

module.exports = jestConfig;
