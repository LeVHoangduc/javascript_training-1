import ContactService from "../services/contactService";
import Contact from "./contact"

class Contacts {
  /**
   * Constructor of Contacts object.
   */
  constructor() {
    this.service = new ContactService();

    this.contactList; // List of contacts.
    this.contactDisplayList; // List of contact for displaying.
    this.contactInfo; // Contact information for displaying.
  }

  /**
   * Initializing the Contacts model.
   */
  init = async () => {
    const data = await this.service.getContactList();
    this.contactList = this.parseData(data);
  }

  /**
  * Parse the data array to array of Contact object.
  * @param {Array} data 
  * @returns {Array} array of Contact object.
  */
  parseData = (data) => {
    return data.map((item) => new Contact(item));
  }

  /**
   * Initializing the Display list.
   * @param {String} getRelationById 
   */
  initDisplayList = (getRelationById) => {
    this.contactDisplayList = this.contactList.map((contact) => {
      return { ...contact, relation: getRelationById(contact.relation) }
    })
    this.contactInfo = this.contactDisplayList[0];
  }

  /**
   * Getter and Setter.
   */
  getContactDisplayList = () => {
    return this.contactDisplayList;
  }

  getContactInfo = () => {
    return this.contactInfo;
  }

  setContactInfo = (id) => {
    const data = this.contactDisplayList.find(contact => contact.id === id);
    this.contactInfo = new Contact(data);
  }

  /**
   * Get contact infomation by ID.
   * @param {String} id 
   * @returns {Object} contact information object.
   */
  getContactById = async (id, getRelationById) => {
    const data = await this.service.getContactById(id);
    this.contactInfo = new Contact({ ...data, relation: getRelationById(data.relation) });
    return this.contactInfo;
  }

  /**
   * Add contact to contact list and database.
   * @param {Object} data 
   */
  addContact = async (data) => {
    const contact = new Contact(data);
    this.contactList.push(contact);
    await this.service.addContact(contact);
  }

  /**
   * Update contact in contact list and database.
   * @param {Object} data 
   */
  editContact = async (data) => {
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
  deleteContactById = async (id) => {
    await this.service.deleteContactById(id);
    this.contactList = this.contactList.filter((item) => item.id !== id);
    this.contactInfo = this.contactDisplayList[0];
  }

  /**
   * Filter and search contact in contact displaying list.
   * @param {Object} params
   */
  filterDisplayList = (params) => {
    const { filter, searchKey } = params;
    this.contactDisplayList = this.contactDisplayList.filter((contact) => {
      let isMatchFilter = true;
      let isMatchSearch = true;
      // Match with filter
      if (filter.relation !== "0") {
        isMatchFilter = contact.relation.id === filter.relation;
      }
      // Match with search key
      if (searchKey) {
        const fields = ['name', 'phone', 'email'];
        isMatchSearch = fields.some(field => contact[field].toString().toLowerCase().includes(searchKey));
      }
      return isMatchFilter && isMatchSearch;
    });
    this.contactInfo = this.contactDisplayList[0];
  }
}

export default Contacts;
