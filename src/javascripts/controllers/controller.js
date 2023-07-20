class Controller {
  /**
   * Constructor of Controller object
   * @param {object} model
   * @param {object} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  /**
   * Initializing the controller
   */
  init() {
    this.initContacts();
    //this.initRelations();
  }

  async initContacts() {
    await this.model.contactList.init();
    const contacts = this.model.contactList.getContacts();
    this.view.contact.renderContactList(contacts);
  }
}

export default Controller;
