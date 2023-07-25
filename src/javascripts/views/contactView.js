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

        this.infoAvatarEl = this.infoEl.querySelector(".info__head__avatar > img");
        this.infoNameEl = this.infoEl.querySelector(".info__head__name");
        this.infoRelationEl = this.infoEl.querySelector(".info__head__relation");
        this.infoPhoneEl = this.infoEl.querySelector(".detail__phone");
        this.infoEmailEl = this.infoEl.querySelector(".detail__email");
        this.infoGrpBtnEl = this.infoEl.querySelector(".info__buttons");
        this.deleteBtnEl = this.infoEl.querySelector(".info__button__delete");
        this.editBtnEl = this.infoEl.querySelector(".info__button__edit");
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

    renderContactInfo(contactInfo) {
        this.infoAvatarEl.setAttribute("src", contactInfo.avatar);
        this.infoNameEl.innerText = `${contactInfo.name}`;
        this.infoRelationEl.innerText = `${contactInfo.relation.name}`;
        this.infoPhoneEl.innerText = `${contactInfo.phone}`;
        this.infoEmailEl.innerText = `${contactInfo.email}`;
        this.infoGrpBtnEl.setAttribute("data-id", contactInfo.id);
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

    addEventDeleteContact = (confirmDelete) => {
        this.deleteBtnEl.addEventListener("click", (event) => {
            const contactId = event.target.parentNode.getAttribute("data-id");
            confirmDelete(contactId);
        })
    }

    addEventEditContact = (editContact) => {
        this.editBtnEl.addEventListener("click", (event) => {
            const contactId = event.target.parentNode.getAttribute("data-id");
            editContact(contactId);
        })
    }

    addEventSearchContact = (searchContact) => {
        this.searchInputEl.addEventListener("keyup", (event) => {
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
        this.filterDropDown.addEventListener("change", (event) => {
            const el = event.target.closest("input");
            console.log(el);
            const relation = el.value;
            filterContact(relation);
        })
    }
}

export default ContactView;
