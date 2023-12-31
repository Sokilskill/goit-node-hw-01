const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(process.cwd(), "db", "contacts.json");

async function listContacts() {
  //  Повертає масив контактів.
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();
  const resultFindContactsById = contactsList.find(
    (contact) => contact.id === contactId
  );
  return resultFindContactsById || null;
}

async function removeContact(contactId) {
  //  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  //  Повертає об'єкт доданого контакту. Повертає null, якщо контакт з таким id не знайдений.
  if (!name && !email && !phone) {
    return null;
  }
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
