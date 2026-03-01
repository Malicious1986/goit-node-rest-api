import {
  addContactService,
  getContactByIdService,
  listContactsService,
  removeContactService,
  updateContactService,
  updateStatusContactService,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  let { page, limit, favorite } = req.query;

  page = parseInt(page);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  limit = parseInt(limit);
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  } else if (limit > 100) {
    limit = 100;
  }

  const offset = (page - 1) * limit;
  const contacts = await listContactsService(req.user.id, offset, limit, favorite);
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactByIdService(id, req.user.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContactService(id, req.user.id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const createContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const newContact = await addContactService(name, email, phone, req.user.id);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const { id } = req.params;
  const updatedContact = await updateContactService(
    id,
    name,
    email,
    phone,
    req.user.id,
  );

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const updateStatusContact = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const updatedContact = await updateStatusContactService(
    id,
    status,
    req.user.id,
  );

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};
