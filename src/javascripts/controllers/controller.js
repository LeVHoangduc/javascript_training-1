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
    const contacts = await this.model.contactList.getContacts();
    await this.view.contact.renderContactList(contacts);
    this.view.contact.addDelegateShowInfo(this.showInfo);
  }

  showInfo = async (contactId) => {
    const contact = await this.model.contactList.getContactById(contactId);
    this.view.contact.renderContactInfo(contact)
  }

}

export default Controller;
