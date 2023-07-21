import Service from "../services/service";
import Contact from "./contact";

class Contacts {
  /**
   * Constructor of Contacts object
   */
  constructor() {
    this.contacts;
    this.contact;
  }

  /**
   * Initializing the Contacts object
   */
  async init() {
    const data = await Service.getContactList();
    this.contacts = this.parseData(data);
  }

  /**
   * Parsing data from JSON object to list of Contact object
   * @param {JSON} data
   */
  parseData(data) {
    return data.map((item) => new Contact(item));
  }

  getContacts() {
    return this.contacts;
  }

  async getContactById(id) {
    const data = await Service.getContactById(id);
    const contact = new Contact(data)
    return contact;
  }

  async addContact(name, relation, phone, email, avatar) {
    const contact = new Contact({ name, relation, phone, email, avatar });
    await Service.addContact(contact);
  }

  async editContact(id, name, relation, phone, email, avatar) {
    const contact = new Contact({ id, name, relation, phone, email, avatar });
    await Service.editContact(contact);
  }

  async deleteContactById(id) {
    await Service.deleteContactById(id);
  }
}

export default Contacts;
