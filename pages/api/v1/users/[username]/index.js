import { createRouter } from "next-connect";
import controller from "../../../../../infra/controller.js";
import user from "../../../../../models/user.js";

const router = createRouter();

router.get(getHandler);

async function getHandler(request, response) {
  const username = request.query.username;
  const userFound = await user.findOneByUsername(username);
  response.status(200).json(userFound);
}

export default router.handler(controller.errorHandlers);
