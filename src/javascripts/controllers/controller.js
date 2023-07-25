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
  async init() {
    await this.initRelations();
    await this.initContacts();
    this.initModal();
  }

  //----- CONTACT CONTROLLER -----//
  async initContacts() {
    await this.model.contact.init();
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    const contacts = this.model.contact.getContactDisplayList();
    this.view.contact.renderContactList(contacts);
    const contactInfo = this.model.contact.getContactInfo();
    this.view.contact.renderContactInfo(contactInfo);
    this.view.contact.addEventEditContact(this.editContact);
    this.view.contact.addEventDeleteContact(this.confirmDelete);
    this.view.contact.addEventAddContact(this.addContact);
    this.view.contact.addDelegateShowInfo(this.showInfo);
    this.view.contact.addEventSearchContact(this.searchContact);
    this.view.contact.addEventShowFilterOptions();
    this.view.contact.addDelegateFilterContact(this.filterContact);
  }

  loadListContacts = () => {
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    this.model.contact.filterDisplayList();
    const contacts = this.model.contact.getContactDisplayList();
    this.view.contact.renderContactList(contacts);
  }

  saveContact = async (id, name, relation, phone, email, avatar) => {
    if (!id) {
      await this.model.contact.addContact(name, relation, phone, email, avatar);
    } else {
      await this.model.contact.editContact(id, name, relation, phone, email, avatar);
      this.showInfo(id);
    }
    this.loadListContacts();
  }

  showInfo = async (contactId) => {
    if (contactId) this.model.contact.setContactInfo(contactId);
    const contactInfo = this.model.contact.getContactInfo();
    this.view.contact.renderContactInfo(contactInfo, this.confirmDelete, this.editContact)
  }

  addContact = () => {
    this.view.modal.renderModal();
  }

  confirmDelete = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.modal.renderConfirmModal(contact);
  }

  deleteContact = async (contactId) => {
    await this.model.contact.deleteContactById(contactId);
    this.loadListContacts();
    this.showInfo();
  }


  editContact = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.modal.renderModal(contactId, contact);
  }

  searchContact = (searchKey) => {
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    this.model.contact.setSearchKey(searchKey);
    this.model.contact.filterDisplayList();
    const result = this.model.contact.getContactDisplayList();
    this.view.contact.renderContactList(result);
  }

  filterContact = (relation) => {
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    this.model.contact.setFilterOpt(relation);
    this.model.contact.filterDisplayList();
    const result = this.model.contact.getContactDisplayList();
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
    this.view.modal.addEventDeleteConfirmed(this.deleteContact);
  }

}

export default Controller;
