import {
  addContactService,
  getContactByIdService,
  listContactsService,
  removeContactService,
  updateContactService,
  updateStatusContactService,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await listContactsService();
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactByIdService(id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await removeContactService(id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const createContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const newContact = await addContactService(name, email, phone);

  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { name, phone, email } = req.body;
  const { id } = req.params;
  const updatedContact = await updateContactService(id, name, email, phone);

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

export const updateStatusContact = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const updatedContact = await updateStatusContactService(id, status);

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};
