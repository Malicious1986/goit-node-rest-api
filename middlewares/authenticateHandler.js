import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import User from "../db/models/User.js";

export const authenticateHandler = async (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    throw HttpError(401);
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }
  const { data, error } = verifyToken(token);

  if (error) {
    throw HttpError(401);
  }

  const user = await User.findByPk(data.id);

  if (!user || user.token !== token) {
    throw HttpError(401);
  }
  req.user = user;

  next();
};
