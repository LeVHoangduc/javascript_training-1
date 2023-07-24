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
        this.searchInputEl = document.querySelector(".features__search__input");
        this.filterBtnEl = document.querySelector(".features__filter > button");
        this.filterDropDown = document.querySelector(".relation-dropdown");
        this.filterOptionEl = ".relation-dropdown__li";
    }

    //----- RENDERING -----//
    renderContactList(contacts) {
        this.contactListEl.innerHTML = "";
        contacts.forEach(contact => {
            this.renderContact(contact);
        })
    }

    renderContact(contact) {
        const contactTemplate = Template.contact(contact);
        this.contactListEl.innerHTML += contactTemplate;
    }

    renderContactInfo(contactInfo, deleteContact, editContact) {
        const infoTemplate = Template.info(contactInfo);
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

    addEventSearchContact = (searchContact) => {
        this.searchInputEl.addEventListener("change", (event) => {
            searchContact(event.target.value);
        });
    }

    addEventShowFilterOptions = () => {
        this.filterBtnEl.addEventListener("click", (event) => {
            this.filterBtnEl.querySelector("img").classList.toggle("rot-90");
            this.filterDropDown.classList.toggle("relation-dropdown--active")
        });
    }

    addDelegateFilterContact = (filterContact) => {
        this.filterDropDown.addEventListener("click", (event) => {
            const el = event.target.closest(this.filterOptionEl);
            const relation = el.innerText;
            filterContact(relation);
        })
    }
}

export default ContactView;
