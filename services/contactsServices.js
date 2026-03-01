import Contact from "../db/models/Contact.js";

export function readContacts() {
  return Contact.findAll();
}

export async function listContactsService(userId, offset, limit, favorite) {
  const where = {
    owner: userId,
  };

  if (favorite !== undefined) {
    where.favorite = favorite === "true";
  }

  return Contact.findAll({
    where,
    limit,
    offset,
  });
}

export function getContactByIdService(contactId, userId) {
  return Contact.findOne({
    where: {
      id: contactId,
      owner: userId,
    },
  });
}

export async function removeContactService(contactId, userId) {
  const contact = await getContactByIdService(contactId, userId);
  if (!contact) return null;

  await contact.destroy();
  return contact;
}

export function addContactService(name, email, phone, userId) {
  return Contact.create({
    name,
    email,
    phone,
    owner: userId,
  });
}

export async function updateContactService(id, name, email, phone, userId) {
  const contact = await getContactByIdService(id, userId);
  if (!contact) return null;

  await contact.update({
    name,
    email,
    phone,
  });

  return contact;
}

export async function updateStatusContactService(id, status, userId) {
  const contact = await getContactByIdService(id, userId);
  if (!contact) return null;

  await contact.update({
    favorite: status,
  });

  return contact;
}
