import Template from "../templates/template";
class ContactView {
    /**
     * Constructor of ContactView object
     */
    constructor() {
        this.contactListEl = document.querySelector(".contacts__list");
        this.infoEl = document.querySelector(".info");
        this.addBtnEl = document.querySelector(".features__add");
        this.searchInputEl = document.querySelector(".features__search__input");
        this.filterBtnEl = document.querySelector(".features__filter > button");
        this.filterDropDown = document.querySelector(".relation-dropdown");

        this.infoAvatarEl = this.infoEl.querySelector(".info__head__avatar > img");
        this.infoNameEl = this.infoEl.querySelector(".info__head__name");
        this.infoRelationEl = this.infoEl.querySelector(".info__head__relation");
        this.infoPhoneEl = this.infoEl.querySelector(".detail__phone");
        this.infoPhoneIconEl = this.infoEl.querySelector(".detail__line--phone > .detail__right");
        this.infoEmailEl = this.infoEl.querySelector(".detail__email");
        this.infoEmailIconEl = this.infoEl.querySelector(".detail__line--email > .detail__right");
        this.infoGrpBtnEl = this.infoEl.querySelector(".info__buttons");
        this.deleteBtnEl = this.infoEl.querySelector(".info__button__delete");
        this.editBtnEl = this.infoEl.querySelector(".info__button__edit");
    }

    contactEl = ".contact-item";

    filterParams = {
        searchKey: "",
        filter: {
            relation: "0"
        }
    };

    //----- RENDERING -----//

    /**
     * Display the contact list.
     * @param {Array} contacts 
     */
    renderContactList = (contacts) => {
        this.contactListEl.innerHTML = "";
        contacts.forEach(contact => {
            this.renderContact(contact);
        })
    }

    /**
     * Render a contact in contact list.
     * @param {Object} contact 
     */
    renderContact = (contact) => {
        const contactTemplate = Template.renderContact(contact);
        this.contactListEl.innerHTML += contactTemplate;
    }

    /**
     * Render contact infomation.
     * @param {Object} contactInfo 
     */
    renderContactInfo = (contactInfo) => {
        if (contactInfo) {
            this.infoAvatarEl.setAttribute("src", contactInfo.avatar);
            this.infoNameEl.innerText = `${contactInfo.name}`;
            this.infoRelationEl.innerText = `${contactInfo.relation.name}`;
            this.infoPhoneEl.innerText = `${contactInfo.phone}`;
            this.infoPhoneEl.setAttribute("href", `tel:${contactInfo.phone}`);
            this.infoPhoneIconEl.setAttribute("href", `tel:${contactInfo.phone}`);
            this.infoEmailEl.innerText = `${contactInfo.email}`;
            this.infoEmailEl.setAttribute("href", `mailto:${contactInfo.email}`);
            this.infoEmailIconEl.setAttribute("href", `mailto:${contactInfo.email}`);
            this.infoGrpBtnEl.setAttribute("data-id", contactInfo.id);
        }
    }

    //----- EVENT HANDLER -----//

    /**
     * Add delegate lisnter showing contact information actions to each contact element.
     * @param {Function} showInfo 
     */
    addDelegateShowInfo = (showInfo) => {
        this.contactListEl.addEventListener("click", (event) => {
            this.contactListEl.querySelector(this.contactEl + ".contact-item--active")?.classList.remove("contact-item--active");
            const el = event.target.closest(this.contactEl);
            if (el) {
                el.classList.add("contact-item--active");
                const contactId = el.getAttribute("data-id");
                showInfo(contactId);
            }
        })
    }

    /**
     * Add event listener adding a contact action to the add contact button.
     * @param {Function} addContact 
     */
    addEventAddContact = (addContact) => {
        this.addBtnEl.addEventListener("click", () => {
            addContact()
        });
    }

    /**
     * Add event listener deleting a contact action to the delete contact button.
     * @param {Function} confirmDelete 
     */
    addEventDeleteContact = (confirmDelete) => {
        this.deleteBtnEl.addEventListener("click", (event) => {
            const contactId = event.target.parentNode.getAttribute("data-id");
            confirmDelete(contactId);
        })
    }

    /**
     * Add event listener editing a contact action to the edit contact button.
     * @param {Function} editContact 
     */
    addEventEditContact = (editContact) => {
        this.editBtnEl.addEventListener("click", (event) => {
            const contactId = event.target.parentNode.getAttribute("data-id");
            editContact(contactId);
        })
    }

    /**
     * Add event listener searching contacts to the search input.
     * @param {Function} searchContact 
     */
    addEventSearchContact = (filterContact) => {
        this.searchInputEl.addEventListener("keyup", (event) => {
            this.filterParams.searchKey = event.target.value.toLowerCase();
            filterContact(this.filterParams);
        });
    }

    /**
     * Add event listenter showing filter options to the filter button.
     */
    addEventShowFilterOptions = () => {
        this.filterBtnEl.addEventListener("click", () => {
            this.filterBtnEl.querySelector("img").classList.toggle("rot-90");
            this.filterDropDown.classList.toggle("relation-dropdown--active")
        });
    }

    /**
     * Add delegate listener filtering contacts to each filter option.
     * @param {Function} filterContact 
     */
    addDelegateFilterContact = (filterContact) => {
        this.filterDropDown.addEventListener("change", (event) => {
            const el = event.target.closest("input");
            this.filterParams.filter.relation = el.value;
            filterContact();
        })
    }
}

export default ContactView;
