class Template {
    /**
     * Constructor of Template object
     */
    constructor() { }

    /**
     * HTML Template for render an Contact object
     * @param {object} contact 
     */
    static contact = (contact) => `
    <li class="contact-item row">
        <div class="contact-item__avatar col-2">
            <img src="${contact.avatar}" alt="avatar" />
        </div>
        <div class="contact-item__info col-3">
            <p class="contact-item__info__name text text--black text--semibold text--xl">${contact.name}</p>
            <p class="text text--gray text--sm text--medium">${contact.relation}</p>
        </div>
        <p class="contact-item__phone col-3 text text--black text--medium text-sm">${contact.phone}</p>
        <p class="text text--black col-4 text--semibold text--lg">${contact.email}</p>
    </li>
  `;
}

export default Template
