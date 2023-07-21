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
  async initContacts() {
    await this.model.contact.init();
    const contacts = await this.model.contact.getContacts();
    await this.view.contact.renderContactList(contacts);
    this.view.contact.addEventAddContact(this.addContact);
    this.view.contact.addDelegateShowInfo(this.showInfo);
  }

  saveContact = async (id, name, relation, phone, email, avatar) => {
    if (!id) {
      await this.model.contact.addContact(name, relation, phone, email, avatar);
    } else {
      await this.model.contact.editContact(id, name, relation, phone, email, avatar);
    }
  }

  showInfo = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.contact.renderContactInfo(contact, this.deleteContact, this.editContact)
  }

  addContact = () => {
    this.view.modal.renderModal();
  }

  deleteContact = (contactId) => {
    this.model.contact.deleteContactById(contactId)
  }

  editContact = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.modal.renderModal(contactId, contact);
  }

  getContactById = (id) => {
    this.model.contact.getContactById(id);
  }

  //----- RELATION CONTROLLER -----//
  async initRelations() {
    await this.model.relation.init();
    const relations = await this.model.relation.getRelations();
    this.view.relation.renderRelationList(relations);
  }

  //----- MODAL CONTROLLER -----//
  async initModal() {
    this.view.modal.addEventCancelModal();
    this.view.modal.addEventSubmission(this.saveContact);
  }

}

export default Controller;
