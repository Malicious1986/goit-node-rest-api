import {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
  uploadAvatar,
  verifyUser,
  resendVerification,
} from "../services/authServices.js";
import gravatar from "gravatar";

export const registerController = async (req, res) => {
  const avatar = gravatar.url(req.body.email, { s: "100", d: "retro" }, false);
  const newUser = await registerUser(req.body, avatar);

  res.status(201).json({
    user: {
      subscription: newUser.subscription,
      email: newUser.email,
      avatarURL: avatar,
    },
  });
};

export const loginController = async (req, res) => {
  const resp = await loginUser(req.body);

  res.status(200).json({ ...resp });
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user.id);
  res.status(204).end();
};

export const currentController = async (req, res) => {
  const user = await currentUser(req.user.id);

  res.status(200).json(user);
};

export const updateSubscriptionController = async (req, res) => {
  const { subscription } = req.body;
  const user = await updateSubscription(req.user.id, subscription);

  res.status(200).json(user);
};

export const avatarsController = async (req, res) => {
  const avatarURL = await uploadAvatar(req.user.id, req.file);
  res.status(200).json({ avatarURL });
};

export const verificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await verifyUser(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

export const resendVerificationController = async (req, res) => {
  const { email } = req.body;

  await resendVerification(email);

  res.status(200).json({ message: "Verification email sent" });
};
