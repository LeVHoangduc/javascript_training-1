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
    const contacts = this.model.contact.getContacts();
    const contactInfo = this.model.contact.getContactInfo();
    this.view.contact.renderContactList(contacts);
    this.view.contact.renderContactInfo(contactInfo, this.deleteContact, this.editContact);
    this.view.contact.addEventAddContact(this.addContact);
    this.view.contact.addDelegateShowInfo(this.showInfo);
    this.view.contact.addEventSearchContact(this.searchContact);
    this.view.contact.addEventShowFilterOptions();
    this.view.contact.addDelegateFilterContact(this.filterContact);
  }

  loadListContacts = () => {
    const contacts = this.model.contact.getContacts();
    this.view.contact.renderContactList(contacts);
  }

  saveContact = async (id, name, relation, phone, email, avatar) => {
    if (!id) {
      await this.model.contact.addContact(name, relation, phone, email, avatar);
    } else {
      await this.model.contact.editContact(id, name, relation, phone, email, avatar);
    }
    this.loadListContacts();
  }

  showInfo = async (contactId) => {
    await this.model.contact.getContactById(contactId);
    const contactInfo = this.model.contact.getContactInfo();
    this.view.contact.renderContactInfo(contactInfo, this.deleteContact, this.editContact)
  }

  addContact = () => {
    this.view.modal.renderModal();
  }

  deleteContact = async (contactId) => {
    await this.model.contact.deleteContactById(contactId);
    this.loadListContacts();
  }

  editContact = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.modal.renderModal(contactId, contact);
  }

  getContactById = (id) => {
    this.model.contact.getContactById(id);
    return this.model.contact.getContactInfo();
  }

  searchContact = (searchKey) => {
    const result = this.model.contact.searchContact(searchKey);
    this.view.contact.renderContactList(result);
  }

  filterContact = (relation) => {
    const result = this.model.contact.filterContact(relation);
    this.view.contact.renderContactList(result);
  }

  //----- RELATION CONTROLLER -----//
  async initRelations() {
    await this.model.relation.init();
    const relations = await this.model.relation.getRelations();
    this.view.relation.renderRelationList(relations);
    this.view.relation.renderRelationDropdownList(relations);
  }

  //----- MODAL CONTROLLER -----//
  async initModal() {
    this.view.modal.addEventCancelModal();
    this.view.modal.addEventSubmission(this.saveContact);
  }

}

export default Controller;
