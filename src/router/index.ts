import { Router } from "express";

import authentication from "./auth.router";
import users from "./user.router";

const router = Router();

export default (): Router => {
  authentication(router);
  users(router);
  return router;
};
