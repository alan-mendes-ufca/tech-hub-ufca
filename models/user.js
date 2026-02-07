import database from "../infra/database.js";
import { NotFoundError, ValitationError } from "../infra/errors.js";

async function create(userInputValues) {
  await validateEmail(userInputValues.email);
  await validateUsername(userInputValues.username);

  const newUser = runInsertQuery(userInputValues);
  return newUser;

  async function runInsertQuery(userInputValues) {
    const result = await database.query({
      text: `
    INSERT INTO 
      users (username, email, password) 
    VALUES 
      ($1, $2, $3)
    RETURNING
      *
    ;`,

      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });
    return result.rows[0];
  }
  async function validateEmail(email) {
    if (!email) {
      const valitationError = new ValitationError({
        message: "Email não informado.",
        action: "Utilize um email para realizar o cadastro.",
      });
      throw valitationError;
    }
    const result = await database.query({
      text: `
    SELECT 
      email 
    FROM
      users
    WHERE
      LOWER(email) = LOWER($1)
    ;`,

      values: [email],
    });
    if (result.rowCount > 0) {
      const valitationError = new ValitationError({
        message: "Email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar o cadastro.",
      });
      throw valitationError;
    }
  }
  async function validateUsername(username) {
    if (!username) {
      const valitationError = new ValitationError({
        message: "Username não informado.",
        action: "Utilize um username para realizar o cadastro.",
      });
      throw valitationError;
    }
    const result = await database.query({
      text: `
    SELECT 
      username 
    FROM
      users
    WHERE
      LOWER(username) = LOWER($1)
    ;`,

      values: [username],
    });
    if (result.rowCount > 0) {
      const valitationError = new ValitationError({
        message: "Username informado já está sendo utilizado.",
        action: "Utilize outro username para realizar o cadastro.",
      });
      throw valitationError;
    }
  }
}

async function findOneByUsername(username) {
  const userFound = runSelectQuery(username);
  return userFound;
  async function runSelectQuery(username) {
    const response = await database.query({
      text: `
    SELECT 
      * 
    FROM 
      users 
    WHERE 
      LOWER(username) = ($1)
    LIMIT
      1
    ;`,
      values: [username],
    });
    if (!response.rows.length > 0) {
      throw new NotFoundError({
        message: "Usuário não encontrado.",
        action: "Registre um usuário ou digite um username válido.",
      });
    }
    return response.rows[0];
  }
}

const user = {
  create,
  findOneByUsername,
};
export default user;
