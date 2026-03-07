import { Router } from "express";
import validateBody from "../helpers/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
  updateSubscriptionSchema,
  resendVerificationSchema,
} from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  logoutController,
  currentController,
  updateSubscriptionController,
  avatarsController,
  verificationController,
  resendVerificationController,
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

authRouter.get("/verify/:verificationToken", verificationController);
authRouter.post(
  "/verify",
  validateBody(resendVerificationSchema),
  resendVerificationController,
);

export default authRouter;
