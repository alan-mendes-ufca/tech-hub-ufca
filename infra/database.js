// `databse.js` é uma forma centralizada de fazer querys no banco de dados.
import { Client } from "pg";

async function query(queryObject) {
  // Inicializando cliente com as variáveis de ambiente.
  const client = new Client({
    // psql --host=localhost --username=postgres --port=5432
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD, // objeto javascript
    ssl: process.env.NODE_ENV == "development" ? false : true,
  });

  /*
  try: tenta executar esse bloco de código.
  catch: se acontecer um erro executará esse bloco.
  finally: independentemente do resultado SEMPRE é executado.
  */

  try {
    await client.connect();
    const result = await client.query(queryObject);
    // Se houver um return dentro do try ou do catch, o bloco finally é SEMPRE executado antes que o retorno aconteça.
    return result;
  } catch (error) {
    console.error(error);
    throw error; // faz com que o finally não seja executado, lançando um erro e travando o sistema.
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
