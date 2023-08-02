import { API_GATEWAY_URL } from "../constants/urls";
import { QUERY } from "../constants/constants";
import ApiRequest from "../helpers/apiRequest";

class ContactService {

  /**
   * Constructor of Contact Service object.
   */
  constructor() {
    this.apiRequest = new ApiRequest(API_GATEWAY_URL, '/contacts');
  }

  /**
   * Get contact list from database.
   * @returns {Array} Contact list
   */
  getContactList = async () => {
    const data = await this.apiRequest.get(null, QUERY.EXPAND_RELATION);
    return data;
  }

  /**
   * Get contact by Id from database.
   * @param {String} id 
   * @returns {Object} Contact object
   */
  getContactById = async (id) => {
    const data = await this.apiRequest.get(id, QUERY.EXPAND_RELATION);
    return data;
  }

  /**
   * Add contact to database.
   * @param {Object} contact 
   */
  addContact = async (contact) => {
    await this.apiRequest.post(contact);
  }

  /**
   * Edit contact from database.
   * @param {Object} contact 
   */
  editContact = async (contact) => {
    await this.apiRequest.patch(contact.id, contact);
  }

  /**
   * Delete contact from database.
   * @param {String} id 
   */
  deleteContactById = async (id) => {
    await this.apiRequest.delete(id);
  }
}

export default ContactService;
