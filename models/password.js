import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();

  if (!password) {
    throw new Error("Password não está definida");
  }

  if (!process.env.PASSWORD_PEPPER) {
    throw new Error("PASSWORD_PEPPER não está configurado!");
  }

  const passwordWithPepper = password + process.env.PASSWORD_PEPPER;
  return await bcryptjs.hash(passwordWithPepper, rounds);

  function getNumberOfRounds() {
    return process.env.NODE_ENV === "production" ? 14 : 1;
  }
}

async function compare(providedPassword, storedPassword) {
  if (!process.env.PASSWORD_PEPPER) {
    throw new Error("PASSWORD_PEPPER não está configurado!");
  }

  const passwordWithPepper = providedPassword + process.env.PASSWORD_PEPPER;
  return await bcryptjs.compare(passwordWithPepper, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
