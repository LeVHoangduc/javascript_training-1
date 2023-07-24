import Service from "../services/service";
import Contact from "./contact";

class Contacts {
  /**
   * Constructor of Contacts object
   */
  constructor() {
    this.contacts;
    this.contactInfo;
  }

  /**
   * Initializing the Contacts object
   */
  async init() {
    const data = await Service.getContactList();
    this.contacts = this.parseData(data);
    this.contactInfo = this.contacts[0];
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

  getContactInfo() {
    return this.contactInfo;
  }

  getTemporaryContacts() {
    return this.contactsTemporary;
  }

  async getContactById(id) {
    const data = await Service.getContactById(id);
    this.contactInfo = new Contact(data);
    return this.contactInfo;
  }

  async addContact(name, relation, phone, email, avatar) {
    const contact = new Contact({ name, relation, phone, email, avatar });
    this.contacts.push(contact);
    await Service.addContact(contact);
  }

  async editContact(id, name, relation, phone, email, avatar) {
    const contact = new Contact({ id, name, relation, phone, email, avatar });
    await Service.editContact(contact);
    this.contacts = this.contacts.map((item) => {
      if (item.id === contact.id) {
        return contact
      }
      return item;
    })
  }

  async deleteContactById(id) {
    await Service.deleteContactById(id);
    this.contacts = this.contacts.filter((item) => item.id !== id);
  }

  searchContact(searchKey) {
    searchKey = searchKey.toLowerCase();
    const result = this.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchKey) || contact.phone.includes(searchKey) || contact.email.includes(searchKey)
    )
    return result;
  }

  filterContact(relation) {
    relation = relation.toLowerCase();
    if (relation === "all") return this.contacts;
    const result = this.contacts.filter((contact) => contact.relation === relation);
    return result;
  }
}

export default Contacts;
