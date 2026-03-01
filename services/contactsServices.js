import Contact from "../db/models/Contact.js";

export function readContacts() {
  return Contact.findAll();
}

export async function listContactsService() {
  return Contact.findAll();
}

export function getContactByIdService(contactId) {
  return Contact.findByPk(contactId);
}

export async function removeContactService(contactId) {
  const contact = await getContactByIdService(contactId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
}

export function addContactService(name, email, phone) {
  return Contact.create({
    name,
    email,
    phone,
  });
}

export async function updateContactService(id, name, email, phone) {
  const contact = await getContactByIdService(id);
  if (!contact) return null;

  await contact.update({
    name,
    email,
    phone,
  });

  return contact;
}

export async function updateStatusContactService(id, status) {
  const contact = await getContactByIdService(id);
  if (!contact) return null;

  await contact.update({
    favorite: status,
  });

  return contact;
}
