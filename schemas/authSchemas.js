import Joi from "joi";
import { emailRegex } from "../constants/auth.js";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string()
    .required()
    .min(6)
    .pattern(passwordRegex)
    .message("Password must be at least 6 characters long and contain at least one letter and one number"),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().required().min(6),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const resendVerificationSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});
