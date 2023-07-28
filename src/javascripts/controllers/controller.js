import { v4 as uuidv4 } from 'uuid';
import handleError from '../helpers/errorHandler';
class Controller {
  /**
   * Constructor of Controller object
   * @param {Object} model
   * @param {Object} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  /**
   * Initializing the controller
   */
  init = async () => {
    await this.initRelations();
    await this.initContacts();
    this.initModal();
  }

  //----- CONTACT CONTROLLER -----//

  /**
   * Initializing the contact list and contact information.
   */
  initContacts = async () => {
    await handleError(this.model.contact.init(), "Couldn't initialize contact list");
    this.loadListContacts();
    this.showInfo();
    this.view.contact.addEventEditContact(this.editContact);
    this.view.contact.addEventDeleteContact(this.confirmDelete);
    this.view.contact.addEventAddContact(this.addContact);
    this.view.contact.addDelegateShowInfo(this.showInfo);
    this.view.contact.addEventSearchContact(this.filterContact);
    this.view.contact.addEventShowFilterOptions();
    this.view.contact.addDelegateFilterContact(this.filterContact);
  }

  /**
   * Load and display the contact list.
   */
  loadListContacts = () => {
    this.model.contact.initDisplayList(this.model.relation.getRelationById);
    this.model.contact.filterDisplayList(this.view.contact.filterParams);
    const contacts = this.model.contact.getContactDisplayList();
    handleError(this.view.contact.renderContactList(contacts), "Couldn't render contact list")
  }

  /**
   * Display the contact information by contact's id or by default.
   * @param {String} contactId 
   */
  showInfo = async (contactId) => {
    if (contactId) this.model.contact.setContactInfo(contactId);
    const contactInfo = this.model.contact.getContactInfo();
    if (contactInfo) {
      handleError(this.view.contact.renderContactInfo(contactInfo), "Couldn't render contact info");
    }
  }

  /**
   * Show the confirm modal when delete a contact.
   * @param {String} contactId 
   */
  confirmDelete = async (contactId) => {
    const contact = await handleError(this.model.contact.getContactById(contactId, this.model.relation.getRelationById), "Couldn't get contact information");
    handleError(this.view.modal.openConfirmModal(contact), "Couldn't open confirm modal");
  }

  /**
   * Show a modal when click add contact.
   */
  addContact = () => {
    handleError(this.view.modal.openModal(), "Couldn't open add modal");
  }

  /**
   * Delete a contact by ID action.
   * @param {String} contactId 
   */
  deleteContact = async (contactId) => {
    await handleError(this.model.contact.deleteContactById(contactId), "Couldn't delete contact");
    this.loadListContacts();
    this.showInfo();
  }

  /**
   * Show a modal for editing when click edit contact.
   * @param {String} contactId 
   */
  editContact = async (contactId) => {
    const contact = await handleError(this.model.contact.getContactById(contactId, this.model.relation.getRelationById), "Couldn't get contact information");
    handleError(this.view.modal.openModal(contactId, contact), "Couldn't open edit modal");
  }

  /**
   * Display the result while searching in contact list.
   */
  filterContact = () => {
    this.loadListContacts();
    this.showInfo();
  }

  /**
   * Add or edit a contact and display the new contact list.
   * @param {Object} contact 
   */
  saveContact = async (contact) => {
    if (!contact.id) {
      contact = {
        id: uuidv4(),
        name: contact.name,
        relation: contact.relation,
        phone: contact.phone,
        email: contact.email,
        avatar: contact.avatar,
      }
      await handleError(this.model.contact.addContact(contact), "Couldn't add contact");
    } else {
      await handleError(this.model.contact.editContact(contact), "Couldn't edit contact");
    }
    this.loadListContacts();
    this.showInfo(contact.id);
  }

  //----- RELATION CONTROLLER -----//

  /**
   * Initializing the relation lists.
   */
  initRelations = async () => {
    await handleError(this.model.relation.init(), "Couldn't initialize relation list")
    const relations = this.model.relation.getRelations();
    this.view.relation.renderRelationList(relations);
    this.view.relation.renderRelationDropdownList(relations);
  }

  //----- MODAL CONTROLLER -----//

  /**
   * Initializing the modals.
   */
  initModal = async () => {
    this.view.modal.addEventSubmission(this.saveContact);
    this.view.modal.addEventDeleteConfirmed(this.deleteContact);
    this.view.modal.addEventCancelModal();
    this.view.modal.addEventCancelConfirmed();
    this.view.modal.addEventClickOutside();
  }

}

export default Controller;
