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

    renderContactInfo(contact) {
        const infoTemplate = Template.info(contact);
        this.infoEl.innerHTML = infoTemplate;
    }

    //----- EVENT HANDLER -----//
    addDelegateShowInfo = (handler) => {
        this.contactListEl.addEventListener("click", (event) => {
            const el = event.target.closest(this.contactEl);
            const contactId = el.getAttribute("data-id");
            handler(contactId);
        })
    }

    addEventAddContact = (handler) => {
        this.addBtnEl.addEventListener("click", () => {
            handler()
        });
    }

    addEventDeleteContact = (deleteContact) => {

    }
}

export default ContactView;
