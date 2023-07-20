import Service from "../services/service";
import Contact from "./contact";

class Contacts {
  /**
   * Constructor of Contacts object
   */
  constructor() {
    this.contacts;
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
   * Get list of Contact objects
   */
  getContacts() {
    return this.contacts;
  }
}

export default Contacts;
