import Contacts from "./contacts";
import Relations from "./relations";

class Model {
  /**
   * Constructor of Model object
   */
  constructor() {
    this.contactList = new Contacts();
    this.relationsList = new Relations();
  }
}

export default Model;
