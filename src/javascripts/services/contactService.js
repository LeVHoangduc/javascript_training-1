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
   */
  async getContactbyId(id) {
    const data = await this.apiRequest.get(this.path, id);
    return data;
  }

  /**
   * Add contact to database.
   */
  async addContact(contact) {
    await this.apiRequest.post(this.path, contact);
  }

  /**
   * Edit contact from database.
   */
  async editContact(contact) {
    await this.apiRequest.patch(this.path, contact.id, contact);
  }

  /**
   * Delete contact from database.
   */
  async deleteContactById(id) {
    await this.apiRequest.delete(this.path, id);
  }
}

export default contactService;
