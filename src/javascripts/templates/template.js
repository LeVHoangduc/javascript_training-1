class Template {
    /**
     * Constructor of Template object
     */
    constructor() { }

    /**
     * HTML Template for render an Contact object
     * @param {Object} contact
     */
    static renderContact = (contact) => `
        <li class="contact-item row" data-id="${contact.id}">
            <div class="contact-item__avatar col-2">
                <img src="${contact.avatar}" alt="avatar" />
            </div>
            <div class="contact-item__info col-3">
                <p class="contact-item__info__name text text--black text--semibold text--xl">${contact.name}</p>
                <p class="text text--gray text--sm text--medium">${contact.relation.name}</p>
            </div>
            <p class="contact-item__phone col-3 text text--black text--medium text-sm">${contact.phone}</p>
            <p class="text text--black col-4 text--semibold text--lg">${contact.email}</p>
        </li>
    `;

    /**
     * HTML Template for the relation list in modal.
     * @param {Object} relation
     */
    static relation = (relation) => `
        <option value="${relation.id}">${relation.name}</option>
    `;

    /**
     * HTML Template for the relation list filter's dropdown.
     * @param {Object} relation
     */
    static relationDropDown = (relation) => `  
        <input type="radio" id="${relation.id}" name="filter_option" value="${relation.id}">     
        <label class="relation-dropdown__li text text--gray text--normal text--lg" for="${relation.id}">${relation.name}</label>
    `;
}

export default Template;
