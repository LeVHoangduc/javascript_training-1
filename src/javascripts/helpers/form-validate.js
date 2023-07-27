import { MESSAGE, REGEX } from "../constants/constants";

/**
 * Form validator check if the information is valid.
 * @param {Object} contact 
 */
const formValidator = (contact) => {
    const modalEl = document.querySelector(".modal");
    const nameInput = modalEl.name;
    const nameError = nameInput.nextElementSibling;
    const phoneInput = modalEl.phone;
    const phoneError = phoneInput.nextElementSibling;
    const emailInput = modalEl.email;
    const emailError = emailInput.nextElementSibling;
    const avatarInput = modalEl.avatar;
    const avatarError = avatarInput.nextElementSibling;

    let isValid = true;

    // Object to store field validation data
    const fields = [
        { name: 'name', regex: REGEX.NAME, error: nameError, requiredMessage: MESSAGE.NAME_REQUIRED, invalidMessage: MESSAGE.INVALID_NAME },
        { name: 'phone', regex: REGEX.PHONE, error: phoneError, requiredMessage: MESSAGE.PHONE_REQUIRED, invalidMessage: MESSAGE.INVALID_PHONE },
        { name: 'email', regex: REGEX.EMAIL, error: emailError, requiredMessage: MESSAGE.EMAIL_REQUIRED, invalidMessage: MESSAGE.INVALID_EMAIL },
        { name: 'avatar', regex: REGEX.AVATAR, error: avatarError, requiredMessage: MESSAGE.AVATAR_REQUIRED, invalidMessage: MESSAGE.INVALID_AVATAR },
    ];

    // Loop through each field to perform validation
    for (const field of fields) {
        const value = contact[field.name];
        const isValidField = field.regex.test(value);
        const inputEl = modalEl[field.name];
        const errorEl = field.error;

        // Check if the field value is empty
        if (value.trim() === '') {
            inputEl.classList.add('input--warning');
            errorEl.textContent = field.requiredMessage;
            errorEl.classList.add('warning-text--active');
            isValid = false;
        }
        // Check if the field value matches the regex pattern
        else if (!isValidField) {
            inputEl.classList.add('input--warning');
            errorEl.textContent = field.invalidMessage;
            errorEl.classList.add('warning-text--active');
            isValid = false;
        }
        // If the field is valid, remove any warning styling and message
        else {
            inputEl.classList.remove('input--warning');
            errorEl.textContent = '';
            errorEl.classList.remove('warning-text--active');
        }
    }
    return isValid;
}

export default formValidator