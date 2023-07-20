import Template from "../templates/template";
class ContactView {
    /**
     * Constructor of ContactView object
     */
    constructor() {
        this.contactListEl = document.querySelector(".contacts__list");
        this.infoEl = document.querySelector(".info");
        this.contactEl = ".contact-item";
    }

    //----- RENDERING -----//

    /**
     * Rendering List of Contact Section
     * @param {array} contacts 
     */
    renderContactList(contacts) {
        contacts.forEach(contact => {
            this.renderContact(contact);
        })
    }

    /**
     * Render Contact Element
     * @param {object} contact 
     */
    renderContact(contact) {
        const contactTemplate = Template.contact(contact);
        this.contactListEl.innerHTML += contactTemplate;
    }

    /**
     * Render Contact Info Section
     * @param {object} contact 
     */
    renderContactInfo(contact) {
        const infoTemplate = Template.info(contact);
        this.infoEl.innerHTML = infoTemplate;
    }

    //----- EVENT HANDLER -----//
    /**
     * Adding delegated event listener for showing a contact
     * @param {function} handler 
     */
    addDelegateShowInfo = (handler) => {
        this.contactListEl.addEventListener("click", (event) => {
            const el = event.target.closest(this.contactEl);
            const contactId = el.getAttribute("data-id");
            handler(contactId);
        })
    }
}

export default ContactView;
