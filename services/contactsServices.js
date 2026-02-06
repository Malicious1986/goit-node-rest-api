import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import DetectEncoding from "detect-file-encoding-and-language";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname, "../db", "contacts.json");

export async function readContacts() {
  try {
    const encoding = await DetectEncoding(contactsPath);
    const file = await fs.readFile(contactsPath, encoding);
    return JSON.parse(file);
  } catch (error) {
    throw new Error(`Failed to read contacts: ${error.message}`);
  }
}

export async function writeContact(file) {
  await fs.writeFile(contactsPath, file);
}

export async function listContactsService() {
  const contacts = await readContacts();
  return contacts;
}

export async function getContactByIdService(contactId) {
  const contacts = await readContacts();
  const contactById =
    contacts.find((contact) => contact.id === contactId) ?? null;

  return contactById;
}

export async function removeContactService(contactId) {
  const contactToRemove = await getContactByIdService(contactId);

  if (!contactToRemove) {
    return null;
  }

  const contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId,
  );

  await writeContact(JSON.stringify(updatedContacts));

  return contactToRemove;
}

export async function addContactService(name, email, phone) {
  const contacts = await readContactsService();
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeContact(JSON.stringify(contacts));

  return newContact;
}

export async function updateContactService(id, name, email, phone) {
  const contact = await getContactByIdService(id);
  if (!contact) {
    return null;
  }
  const updatedContact = {
    ...contact,
    name: name ?? contact.name,
    email: email ?? contact.email,
    phone: phone ?? contact.phone,
  };

  return updatedContact;
}
