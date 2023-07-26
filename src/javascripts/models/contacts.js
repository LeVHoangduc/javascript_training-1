import contactService from "../services/contactService";
import Contact from "./contact"

class Contacts {
  /**
   * Constructor of Contacts object.
   */
  constructor() {
    this.service = new contactService();

    this.contactList; // List of contacts.
    this.contactDisplayList; // List of contact for displaying.
    this.contactInfo; // Contact information for displaying.

    this.searchKey; //Search key.
    this.filterOpt; // Filter options.
  }

  /**
   * Initializing the Contacts model.
   */
  async init() {
    const data = await this.service.getContactList();
    this.contactList = await this.parseData(data);
  }

  /**
   * Initializing the Display list.
   * @param {String} getRelationById 
   */
  initDisplayList(getRelationById) {
    this.contactDisplayList = this.contactList.map((contact) => {
      return { ...contact, relation: getRelationById(contact.relation) }
    })
    this.contactInfo = this.contactDisplayList[0];
  }

  /**
   * Parse the data array to array of Contact object.
   * @param {Array} data 
   */
  parseData(data) {
    console.log(data);
    return data.map((item) => new Contact(item));
  }

  /**
   * Getter and Setter.
   */
  getContactDisplayList() {
    return this.contactDisplayList;
  }

  getContactInfo() {
    return this.contactInfo;
  }

  setContactInfo(id) {
    const data = this.contactDisplayList.find(contact => contact.id === id);
    this.contactInfo = new Contact(data);
  }

  setSearchKey(searchKey) {
    this.searchKey = searchKey.toLowerCase();
  }

  setFilterOpt(filterOpt) {
    this.filterOpt = filterOpt;
  }

  /**
   * Get contact infomation by ID.
   * @param {String} id 
   */
  async getContactById(id) {
    const data = this.contactDisplayList.find(contact => contact.id === id);
    this.contactInfo = new Contact(data);
    return this.contactInfo;
  }

  /**
   * Add contact to contact list and database.
   * @param {Object} data 
   */
  async addContact(data) {
    const contact = new Contact(data);
    this.contactList.push(contact);
    await this.service.addContact(contact);
  }

  /**
   * Update contact in contact list and database.
   * @param {Object} data 
   */
  async editContact(data) {
    const contact = new Contact(data);
    await this.service.editContact(contact);
    this.contactList = this.contactList.map((item) => {
      if (item.id === contact.id) {
        return contact
      }
      return item;
    })
  }

  /**
   * Delete contact from contact list and database.
   * @param {String} id 
   */
  async deleteContactById(id) {
    await this.service.deleteContactById(id);
    this.contactList = this.contactList.filter((item) => item.id !== id);
    this.contactInfo = this.contactDisplayList[0];
  }

  /**
   * Filter and search contact in contact displaying list.
   */
  filterDisplayList() {
    this.contactDisplayList = this.contactDisplayList
      .filter((contact) => {
        if (this.filterOpt === "0" || !this.filterOpt) return true;
        else return contact.relation.id === this.filterOpt
      })
      .filter((contact) => {
        if (!this.searchKey) return true;
        else return contact.name.toLowerCase().includes(this.searchKey) || contact.phone.includes(this.searchKey) || contact.email.includes(this.searchKey)
      })
    this.contactInfo = this.contactDisplayList[0];
  }
}

export default Contacts;
