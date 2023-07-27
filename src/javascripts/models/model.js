import Contacts from "./contacts";
import Relations from "./relations";

class Model {
  /**
   * Constructor of Model object
   */
  constructor() {
    this.contact = new Contacts();
    this.relation = new Relations();
  }
}

export default Model;
