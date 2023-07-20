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
   * Get relation list from database
   */
  static async getRelationList() {
    const response = await fetch(`${API_GATEWAY_URL}/relations`);
    const data = response.json();
    return data;
  }
}

export default Service;
