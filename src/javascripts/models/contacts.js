import Service from "../services/service";
import Contact from "./contact";

class Contacts {
  /**
   * Constructor of Contacts object
   */
  constructor() {
    this.contactList;
    this.contactDisplayList;
    this.contactInfo;
    this.searchKey;
    this.filterOpt;
  }

  /**
   * Initializing the Contacts object
   */
  async init() {
    const data = await Service.getContactList();
    this.contactList = await this.parseData(data);
  }

  initDisplayList(getRelationById) {
    this.contactDisplayList = this.contactList.map((contact) => {
      return { ...contact, relation: getRelationById(contact.relation) }
    })
    this.contactInfo = this.contactDisplayList[0];
  }

  /**
   * Parsing data from JSON object to list of Contact object
   * @param {JSON} data
   */
  parseData(data) {
    return data.map((item) => new Contact(item));
  }

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

  async getContactById(id) {
    const data = this.contactDisplayList.find(contact => contact.id === id);
    this.contactInfo = new Contact(data);
    return this.contactInfo;
  }

  async addContact(name, relation, phone, email, avatar) {
    const contact = new Contact({ name, relation, phone, email, avatar });
    this.contactList.push(contact);
    await Service.addContact(contact);
  }

  async editContact(id, name, relation, phone, email, avatar) {
    const contact = new Contact({ id, name, relation, phone, email, avatar });
    await Service.editContact(contact);
    this.contactList = this.contactList.map((item) => {
      if (item.id === contact.id) {
        return contact
      }
      return item;
    })
  }

  async deleteContactById(id) {
    await Service.deleteContactById(id);
    this.contactList = this.contactList.filter((item) => item.id !== id);
    this.contactInfo = this.contactDisplayList[0];
  }

  setSearchKey(searchKey) {
    this.searchKey = searchKey;
  }

  setFilterOpt(filterOpt) {
    this.filterOpt = filterOpt;
  }

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
    console.log(this.contactDisplayList);
  }
}

export default Contacts;
