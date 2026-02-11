import database from "infra/database";
import crypto from "node:crypto";

const EXPIRATION_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000; // 30 Days

async function create(userId) {
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);
  const newSession = await insertQuery(token, userId, expiresAt);
  return newSession;

  async function insertQuery(token, userId, expiresAt) {
    const result = await database.query({
      text: `
      INSERT INTO
        sessions (token, user_id, expires_at, updated_at)
      VALUES
        ($1, $2, $3, timezone('utc', now()))
      RETURNING
        *
      ;`,
      values: [token, userId, expiresAt],
    });

    return result.rows[0];
  }
}

const session = {
  create,
  EXPIRATION_IN_MILLISECONDS,
};

export default session;
