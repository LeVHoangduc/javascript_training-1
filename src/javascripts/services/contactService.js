import { API_GATEWAY_URL } from "../constants/urls";
import apiRequest from "../helpers/api-request";

class contactService {

  /**
   * Constructor of Contact Service object.
   */
  constructor() {
    this.apiRequest = new apiRequest(API_GATEWAY_URL);
    this.path = '/contacts';
  }

  /**
   * Get contact list from database.
   */
  async getContactList() {
    const data = await this.apiRequest.get(this.path);
    return data;
  }

  /**
   * Get contact by Id from database.
   * @param {String} id 
   */
  async getContactbyId(id) {
    const data = await this.apiRequest.get(this.path, id);
    return data;
  }

  /**
   * Add contact to database.
   * @param {Object} contact 
   */
  async addContact(contact) {
    await this.apiRequest.post(this.path, contact);
  }

  /**
   * Edit contact from database.
   * @param {Object} contact 
   */
  async editContact(contact) {
    await this.apiRequest.patch(this.path, contact.id, contact);
  }

  /**
   * Delete contact from database.
   * @param {String} id 
   */
  async deleteContactById(id) {
    await this.apiRequest.delete(this.path, id);
  }
}

export default contactService;
