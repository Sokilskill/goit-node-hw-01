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

// const watchContacts = async () => {
//   const contactList = await contacts.listContacts();
//   console.log("contacts", contactList);
// };
// // watchContacts();

// const getById = async (id) => {
//   const contact = await contacts.getContactById(id);
//   console.log("Contact Found", contact);
// };
// // getById("AeHIrLTr6JkxGE6SN-0Rw");
// // getById("23");

// const add = async (name, email, phone) => {
//   const addContacts = await contacts.addContact(name, email, phone);
//   return await console.log("addContacts", addContacts);
// };
// // add("Luis", "luis@gmail.com", "932-99-32"); // в nodemon  зациклює виконання функції
// // add();

// const deletebyId = async (id) => {
//   const contact = await contacts.removeContact(id);
//   return console.log("contact", contact);
// };
// // deletebyId("5dvHsiwDBr-xmHfONZaEA");
