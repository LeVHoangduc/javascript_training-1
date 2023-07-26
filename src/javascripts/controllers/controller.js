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

  /**
   * Initializing the contact list and contact information.
   */
  async initContacts() {
    await this.model.contact.init();
    this.loadListContacts();
    this.showInfo();
    this.view.contact.addEventEditContact(this.editContact);
    this.view.contact.addEventDeleteContact(this.confirmDelete);
    this.view.contact.addEventAddContact(this.addContact);
    this.view.contact.addDelegateShowInfo(this.showInfo);
    this.view.contact.addEventSearchContact(this.searchContact);
    this.view.contact.addEventShowFilterOptions();
    this.view.contact.addDelegateFilterContact(this.filterContact);
  }

  /**
   * Load and display the contact list.
   */
  loadListContacts = () => {
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    this.model.contact.filterDisplayList();
    const contacts = this.model.contact.getContactDisplayList();
    try {
      this.view.contact.renderContactList(contacts);
    } catch (err) {
      alert(`Couldn't render contact list
      Error message: ${err.message}`);
    }
  }

  /**
   * Display the contact information by contact's id or by default.
   * @param {string} contactId 
   */
  showInfo = async (contactId) => {
    if (contactId) this.model.contact.setContactInfo(contactId);
    const contactInfo = this.model.contact.getContactInfo();
    console.log(contactInfo);
    try {
      this.view.contact.renderContactInfo(contactInfo)
    }
    catch (err) {
      alert(`Couldn't render contact info
      Error message: ${err.message}`)
    }
  }

  /**
   * Show the confirm modal when delete a contact.
   * @param {string} contactId 
   */
  confirmDelete = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.modal.renderConfirmModal(contact);
  }

  /**
   * Show a modal when click add contact.
   */
  addContact = () => {
    this.view.modal.renderModal();
  }

  /**
   * Delete a contact by ID action.
   * @param {string} contactId 
   */
  deleteContact = async (contactId) => {
    await this.model.contact.deleteContactById(contactId);
    this.loadListContacts();
    this.showInfo();
  }

  /**
   * Show a modal for editing when click edit contact.
   * @param {string} contactId 
   */
  editContact = async (contactId) => {
    const contact = await this.model.contact.getContactById(contactId);
    this.view.modal.renderModal(contactId, contact);
  }

  /**
   * Display the result while searching in contact list.
   * @param {string} searchKey 
   */
  searchContact = (searchKey) => {
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    this.model.contact.setSearchKey(searchKey);
    this.model.contact.filterDisplayList();
    const result = this.model.contact.getContactDisplayList();
    this.view.contact.renderContactList(result);
    this.showInfo();
  }

  /**
   * Display the result while filtering contact list. 
   * @param {string} relation 
   */
  filterContact = (relation) => {
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    this.model.contact.setFilterOpt(relation);
    this.model.contact.filterDisplayList();
    const result = this.model.contact.getContactDisplayList();
    this.view.contact.renderContactList(result);
    this.showInfo();
  }

  /**
   * Add or edit a contact and display the new contact list.
   * @param {object} contact 
   */
  saveContact = async (contact) => {
    if (!contact.id) {
      const { v4: uuidv4 } = require("uuid");
      contact = {
        id: uuidv4(),
        name: contact.name,
        relation: contact.relation,
        phone: contact.phone,
        email: contact.email,
        avatar: contact.avatar,
      }
      await this.model.contact.addContact(contact);
    } else {
      await this.model.contact.editContact(contact);
    }
    this.loadListContacts();
    this.showInfo(contact.id);
  }

  //----- RELATION CONTROLLER -----//

  /**
   * Initializing the relation lists.
   */
  async initRelations() {
    await this.model.relation.init();
    const relations = await this.model.relation.getRelations();
    this.view.relation.renderRelationList(relations);
    this.view.relation.renderRelationDropdownList(relations);
  }

  //----- MODAL CONTROLLER -----//

  /**
   * Initializing the modals.
   */
  async initModal() {
    this.view.modal.addEventCancelModal();
    this.view.modal.addEventSubmission(this.saveContact);
    this.view.modal.addEventDeleteConfirmed(this.deleteContact);
  }

}

export default Controller;
