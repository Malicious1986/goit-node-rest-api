import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwt.js";

export const registerUser = async (payload) => {
  const existingUser = await User.findOne({ where: { email: payload.email } });

  if (existingUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = createToken({ id: user.id });

  user.token = token;
  await user.save();

  return {
    user: {
      subscription: user.subscription,
      email: user.email,
    },
    token,
  };
};

export const logoutUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw HttpError(401);
  }

  user.token = null;
  await user.save();
};

export const currentUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw HttpError(401);
  }

  return { email: user.email, subscription: user.subscription };
};

export const updateSubscription = async (id, subscription) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw HttpError(401);
  }

  user.subscription = subscription;
  await user.save();

  return { email: user.email, subscription: user.subscription };
};
