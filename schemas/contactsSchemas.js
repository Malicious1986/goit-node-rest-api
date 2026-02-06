import joi from "joi";

export const createContactQuerySchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().max(30).required(),
  phone: joi.string().min(7).max(15).required(),
});

export const updateContactQuerySchema = joi
  .object({
    name: joi.string().min(3).max(30),
    email: joi.string().email().max(30),
    phone: joi.string().min(7).max(15),
  })
  .or("name", "email", "phone")
  .messages({
    "object.missing":
      "At least one field (name, email, or phone) must be provided",
  });
