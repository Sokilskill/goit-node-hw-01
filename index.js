const contacts = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      return console.table(contactList);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case "add":
      const addContacts = await contacts.addContact(name, email, phone);
      return console.log(addContacts);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
