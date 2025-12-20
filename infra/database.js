// `databse.js` é uma forma centralizada de fazer querys no banco de dados.
import { Client } from "pg";

async function query(queryObject) {
  // Inicializando cliente com as variáveis de ambiente.
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    // Se houver um return dentro do try ou do catch, o bloco finally é SEMPRE executado antes que o retorno aconteça.
    return result;
  } catch (error) {
    // console.error(error);
    throw error; // faz com que o finally não seja executado, lançando um erro e travando o sistema.
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    // psql --host=localhost --username=postgres --port=5432
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD, // objeto javascript
    ssl: getSSLValues(),
  });

  await client.connect();

  return client;
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return process.env.POSTGRES_CA;
  }

  return process.env.NODE_ENV == "development" ||
    process.env.NODE_ENV === "test"
    ? false
    : true;
}

export default {
  query,
  getNewClient,
};
