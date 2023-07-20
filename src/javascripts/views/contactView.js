import Template from "../templates/template";

class ContactView {
    /**
     * Constructor of ContactView object
     */
    constructor() {
        this.contactListEl = document.querySelector(".contacts__list")
    }

    //----- RENDERING -----//

    /**
     * Rendering List of Contact
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

    //----- EVENT HANDLER -----//
    // addDelegateShowInfo = (handler) => {
    //     this.contactListEl.addDelegateListener(
    //         "click",
    //     )
    // }
}

export default ContactView;
