import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
  updateSubscriptionSchema,
} from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  avatarsController,
} from "../controllers/authController.js";

import { authenticateHandler } from "../middlewares/authenticateHandler.js";
import { uploadHandler } from "../middlewares/uploadHandler.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  registerController,
);

authRouter.post("/login", validateBody(authLoginSchema), loginController);
authRouter.post("/logout", authenticateHandler, logoutController);
authRouter.get("/current", authenticateHandler, currentController);
authRouter.patch(
  "/subscription",
  authenticateHandler,
  validateBody(updateSubscriptionSchema),
  updateSubscriptionController,
);
authRouter.patch(
  "/avatars",
  authenticateHandler,
  uploadHandler.single("avatar"),
  avatarsController,
);

export default authRouter;
