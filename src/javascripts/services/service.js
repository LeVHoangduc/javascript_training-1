import { API_GATEWAY_URL } from "../constants/urls";

class Service {
  /**
   * Constructor of Contact object
   */
  constructor() { }

  /**
   * Get contact list from database
   */
  static async getContactList() {
    const response = await fetch(`${API_GATEWAY_URL}/contacts`);
    const data = response.json();
    return data;
  }

  /**
   * Get contact by Id from database
   */
  static async getContactById(id) {
    const response = await fetch(`${API_GATEWAY_URL}/contacts/${id}`);
    const data = response.json();
    return data;
  }

  /**
   * Add contact to database
   */
  static async addContact(contact) {
    await fetch(`${API_GATEWAY_URL}/contacts`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
      })
  }

  /**
   * Edit contact from database
   */
  static async editContact(contact) {
    await fetch(`${API_GATEWAY_URL}/contacts/${contact.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact)
      })
  }

  /**
   * Delete contact from database
   */
  static async deleteContactById(id) {
    await fetch(`${API_GATEWAY_URL}/contacts/${id}`,
      {
        method: "DELETE",
      })
  }

  /**
   * Get relation list from database
   */
  static async getRelationList() {
    const response = await fetch(`${API_GATEWAY_URL}/relations`);
    const data = response.json();
    return data;
  }
}

export default Service;
