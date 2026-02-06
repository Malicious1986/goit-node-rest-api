import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { createValidator } from "express-joi-validation";
import {
  createContactQuerySchema,
  updateContactQuerySchema,
} from "../schemas/contactsSchemas.js";

const validator = createValidator({ passError: true });

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post(
  "/",
  validator.body(createContactQuerySchema),
  createContact,
);

contactsRouter.put(
  "/:id",
  validator.body(updateContactQuerySchema),
  updateContact,
);

export default contactsRouter;
