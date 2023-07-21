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

  /**
   * Get Contact objects list
   * @returns {array}
   */
  getContacts() {
    return this.contacts;
  }

  /**
   * Get Contact object by Id
   * @param {string} id 
   * @returns {object}
   */
  async getContactById(id) {
    const data = await Service.getContactById(id);
    this.contact = new Contact(data)
    return this.contact;
  }

  async addContact(name, relation, phone, email, avatar) {
    const contact = new Contact({ name, relation, phone, email, avatar });
    console.log(contact);
    await Service.addContact(contact);
  }
}

export default Contacts;
