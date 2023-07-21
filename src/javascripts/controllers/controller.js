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
    this.initRelations();
    this.initModal();
  }

  //----- CONTACT CONTROLLER -----//
  /**
   * Initializing the Contact interface and event handlers
   */
  async initContacts() {
    await this.model.contact.init();
    const contacts = await this.model.contact.getContacts();
    await this.view.contact.renderContactList(contacts);
    this.view.contact.addDelegateShowInfo(this.showInfo);
    this.view.contact.addEventAddContact(this.addContact);
  }

  saveContact = async (id, name, relation, phone, email, avatar) => {
    if (!id) {
      const contact = await this.model.contact.addContact(name, relation, phone, email, avatar);
      console.log(contact, id, name, relation, phone, email, avatar);
    }
  }

  /**
   * Showing the contact information
   * @param {string} contactId 
   */
  showInfo = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.contact.renderContactInfo(contact)
  }




  //----- RELATION CONTROLLER -----//
  /**
   * Initializing the Relation interface and event handlers
   */
  async initRelations() {
    await this.model.relation.init();
    const relations = await this.model.relation.getRelations();
    this.view.relation.renderRelationList(relations);
  }

  //----- MODAL CONTROLLER -----//
  /**
   * Initializing the Relation interface and event handlers
   */
  async initModal() {
    this.view.modal.addEventCancelModal();
    this.view.modal.addEventSubmission(this.saveContact);
  }

  addContact = () => {
    this.view.modal.renderModal();
  }

}

export default Controller;
