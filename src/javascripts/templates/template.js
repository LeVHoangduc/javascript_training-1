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
    <li class="contact-item row" data-id="${contact.id}">
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

    static info = (contact) => `
    <div class="info__head">
        <div class="info__head__avatar">
        <img src="${contact.avatar}" alt="avatar" />
        </div>
        <p class="text text--black text--normal text--lg">${contact.name}</p>
        <p class="text text--gray text--medium text--sm">${contact.relation}</p>
    </div>
    <div class="info__body">
        <h2 class="info__body__title text text--fantastic text--normal text-sm">Contact</h2>
        <div class="info__body__contact">
        <div class="detail detail--phone">
            <div class="detail__left">
            <p class="text text--medium text--sm text--gray">Phone number</p>
            <p class="text text--medium text--sm text--black">${contact.phone}</p>
            </div>
            <div class="detail__right">
            <img src="https://res.cloudinary.com/de59jbjlb/image/upload/v1689827289/phone-icon_pvx8ut.svg" alt="phone" />
            </div>
        </div>
        <div class="detail detail--mail">
            <div class="detail__left">
            <p class="text text--medium text--sm text--gray">Email Address</p>
            <p class="text text--medium text--sm text--black">${contact.email}</p>
            </div>
            <div class="detail__right">
            <img src="https://res.cloudinary.com/de59jbjlb/image/upload/v1689827289/mail-icon_kn7qdr.svg" alt="mail" />
            </div>
        </div>
        </div>
    </div>
    <div class="info__buttons" data-id="${contact.id}">
        <button class="info__button__edit btn btn--primary text text--medium text--sm">Edit</button>
        <button class="info__button__delete btn btn--secondary text text--medium text--sm">Delete</button>
    </div>
    `;

    static relation = (relation) => `
    <option value="${relation.name}">${relation.name}</option>
    `

    static relationDropDown = (relation) => `  
    <input type="radio" id="${relation.id}" name="filter_option" value="${relation.name}">     
    <label class="relation-dropdown__li text text--gray text--normal text--lg" for="${relation.id}">${relation.name}</label>
    `
}

export default Template
