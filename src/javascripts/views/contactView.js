import Template from "../templates/template";
class ContactView {
    /**
     * Constructor of ContactView object
     */
    constructor() {
        this.contactListEl = document.querySelector(".contacts__list");
        this.infoEl = document.querySelector(".info");
        this.contactEl = ".contact-item";
        this.addBtnEl = document.querySelector(".features__add");

    }

    //----- RENDERING -----//
    renderContactList(contacts) {
        contacts.forEach(contact => {
            this.renderContact(contact);
        })
    }

    renderContact(contact) {
        const contactTemplate = Template.contact(contact);
        this.contactListEl.innerHTML += contactTemplate;
    }

    renderContactInfo(contact, deleteContact, editContact) {
        const infoTemplate = Template.info(contact);
        this.infoEl.innerHTML = infoTemplate;
        this.deleteBtnEl = this.infoEl.querySelector(".info__button__delete");
        this.editBtnEl = this.infoEl.querySelector(".info__button__edit");
        this.addEventDeleteContact(this.deleteBtnEl, deleteContact);
        this.addEventEditContact(this.editBtnEl, editContact);
    }

    //----- EVENT HANDLER -----//
    addDelegateShowInfo = (showInfo) => {
        this.contactListEl.addEventListener("click", (event) => {
            const el = event.target.closest(this.contactEl);
            const contactId = el.getAttribute("data-id");
            showInfo(contactId);
        })
    }

    addEventAddContact = (addContact) => {
        this.addBtnEl.addEventListener("click", () => {
            addContact()
        });
    }

    addEventDeleteContact = (El, deleteContact) => {
        El.addEventListener("click", (event) => {
            const contactId = event.target.parentNode.getAttribute("data-id");
            deleteContact(contactId);
        })
    }

    addEventEditContact = (El, editContact) => {
        El.addEventListener("click", (event) => {
            const contactId = event.target.parentNode.getAttribute("data-id");
            editContact(contactId);
        })
    }
}

export default ContactView;
