import { API_GATEWAY_URL } from "../constants/urls";
import apiRequest from "../helpers/apiRequest";

class ContactService {

  /**
   * Constructor of Contact Service object.
   */
  constructor() {
    this.apiRequest = new apiRequest(API_GATEWAY_URL, '/contacts');
  }

  /**
   * Get contact list from database.
   * @returns {Array} Contact list
   */
  async getContactList() {
    const data = await this.apiRequest.get();
    return data;
  }

  /**
   * Get contact by Id from database.
   * @param {String} id 
   * @returns {Object} Contact object
   */
  async getContactById(id) {
    const data = await this.apiRequest.get(id);
    return data;
  }

  /**
   * Add contact to database.
   * @param {Object} contact 
   */
  async addContact(contact) {
    await this.apiRequest.post(contact);
  }

  /**
   * Edit contact from database.
   * @param {Object} contact 
   */
  async editContact(contact) {
    await this.apiRequest.patch(contact.id, contact);
  }

  /**
   * Delete contact from database.
   * @param {String} id 
   */
  async deleteContactById(id) {
    await this.apiRequest.delete(id);
  }
}

export default ContactService;
