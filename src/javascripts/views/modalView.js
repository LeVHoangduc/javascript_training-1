import { MESSAGE } from "../constants/message";

class ModalView {
    /**
     * Constructor of ModalView object
     */
    constructor() {
        this.modalEl = document.querySelector(".modal");
        this.confirmModalEl = document.querySelector(".confirm-modal");

        this.overlayEl = document.querySelector(".overlay");
        this.cancelBtnEl = document.querySelectorAll(".modal__top__btn,.modal__buttons__cancel,.confirm-modal__buttons__cancel,.overlay");
        this.confirmBtnEl = this.confirmModalEl.querySelector(".confirm-modal__buttons__confirm");

        this.nameInput = this.modalEl.name;
        this.nameError = this.nameInput.nextElementSibling;
        this.phoneInput = this.modalEl.phone;
        this.phoneError = this.phoneInput.nextElementSibling;
        this.emailInput = this.modalEl.email;
        this.emailError = this.emailInput.nextElementSibling;
        this.avatarInput = this.modalEl.avatar;
        this.avatarError = this.avatarInput.nextElementSibling;
    }

    //----- RENDERING -----//

    async renderModal(contactId, contact) {
        this.modalEl.classList.add("modal--active");
        this.overlayEl.classList.add("overlay--active");
        if (contactId) {
            this.modalEl.setAttribute("data-id", contactId);
            this.modalEl.querySelector('input[name="name"]').value = contact.name;
            this.modalEl.querySelector('select[name="relation"]').value = contact.relation.id;
            this.modalEl.querySelector('input[name="phone"]').value = contact.phone;
            this.modalEl.querySelector('input[name="avatar"]').value = contact.avatar;
            this.modalEl.querySelector('input[name="email"]').value = contact.email;
        };
    }

    renderConfirmModal = (contact) => {
        this.confirmModalEl.classList.add('confirm-modal--active');
        this.overlayEl.classList.add("overlay--active");
        this.confirmModalEl.setAttribute('data-id', contact.id);
        this.confirmModalEl.querySelector('.confirm-modal__message').innerText = `${MESSAGE.CONFIRM_MESSAGE}${contact.name}`;
    }

    //----- EVENT HANDLER -----//

    addEventCancelModal = () => {
        this.cancelBtnEl.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.modalEl.classList.remove("modal--active");
                this.confirmModalEl.classList.remove("confirm-modal--active");
                this.overlayEl.classList.remove("overlay--active");
                this.modalEl.removeAttribute("data-id");
                this.resetModal();
            });
        })
    }

    addEventSubmission = (saveContact) => {
        this.modalEl.addEventListener("submit", async (event) => {
            event.preventDefault();
            const contact = {
                id: this.modalEl.getAttribute("data-id"),
                name: this.modalEl.name.value,
                relation: this.modalEl.relation.value,
                phone: this.modalEl.phone.value,
                email: this.modalEl.email.value,
                avatar: this.modalEl.avatar.value,
            }

            if (this.validateForm(contact)) {
                this.modalEl.classList.remove("modal--active");
                this.overlayEl.classList.remove("overlay--active");
                saveContact(contact);
                this.resetModal();
            }
        })
    }

    resetModal = () => {
        this.modalEl.removeAttribute("data-id");
        this.modalEl.reset();
        this.modalEl.querySelectorAll('input').forEach((El) => {
            El.classList.remove('input--warning');
            El.nextElementSibling.classList.remove('warning-text--active');
        });
    }

    addEventDeleteConfirmed = (deleteContact) => {
        this.confirmBtnEl.addEventListener("click", () => {
            const id = this.confirmModalEl.getAttribute("data-id");
            this.confirmModalEl.classList.remove("confirm-modal--active");
            this.overlayEl.classList.remove("overlay--active");
            deleteContact(id);
        })
    }

    //----- VALIDATE FORM -----//

    validateForm(contact) {

        let isValid = true;

        // Expressions for validation
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const avatarRegex = /\.(jpeg|jpg|png|gif|bmp|svg)$/i;

        // Validation checks
        const isNameValid = nameRegex.test(contact.name);
        const isPhoneValid = phoneRegex.test(contact.phone);
        const isEmailValid = emailRegex.test(contact.email);
        const isAvatarValid = avatarRegex.test(contact.avatar);

        console.log(isNameValid, isPhoneValid, isEmailValid, isAvatarValid);

        if (contact.name.trim() === '') {
            this.modalEl.name.classList.add('input--warning');
            this.nameError.textContent = `${MESSAGE.NAME_REQUIRED}`;
            this.nameError.classList.add('warning-text--active');
            isValid = false;
        } else if (!isNameValid) {
            this.modalEl.name.classList.add('input--warning');
            this.nameError.textContent = `${MESSAGE.INVALID_NAME}`;
            this.nameError.classList.add('warning-text--active');
            isValid = false;
        } else if (isNameValid) {
            this.modalEl.name.classList.remove('input--warning');
            this.nameError.textContent = ``;
            this.nameError.classList.remove('warning-text--active');
        }

        if (contact.phone.trim() === '') {
            this.modalEl.phone.classList.add('input--warning');
            this.phoneError.textContent = `${MESSAGE.PHONE_REQUIRED}`;
            this.phoneError.classList.add('warning-text--active');
            isValid = false;
        } else if (!isPhoneValid) {
            this.modalEl.phone.classList.add('input--warning');
            this.phoneError.textContent = `${MESSAGE.INVALID_PHONE}`;
            this.phoneError.classList.add('warning-text--active');
            isValid = false;
        } else if (isPhoneValid) {
            this.modalEl.phone.classList.remove('input--warning');
            this.phoneError.textContent = ``;
            this.phoneError.classList.remove('warning-text--active');
        }

        if (contact.email.trim() === '') {
            this.modalEl.email.classList.add('input--warning');
            this.emailError.textContent = `${MESSAGE.EMAIL_REQUIRED}`;
            this.emailError.classList.add('warning-text--active');
            isValid = false;
        } else if (!isEmailValid) {
            this.modalEl.email.classList.add('input--warning');
            this.emailError.textContent = `${MESSAGE.INVALID_EMAIL}`;
            this.emailError.classList.add('warning-text--active');
            isValid = false;
        } else if (isEmailValid) {
            this.modalEl.email.classList.remove('input--warning');
            this.emailError.textContent = ``;
            this.emailError.classList.remove('warning-text--active');
        }

        if (contact.avatar.trim() === '') {
            this.modalEl.avatar.classList.add('input--warning');
            this.avatarError.textContent = `${MESSAGE.AVATAR_REQUIRED}`;
            this.avatarError.classList.add('warning-text--active');
            isValid = false;
        } else if (!isAvatarValid) {
            this.modalEl.avatar.classList.add('input--warning');
            this.avatarError.textContent = `${MESSAGE.INVALID_AVATAR}`;
            this.avatarError.classList.add('warning-text--active');
            isValid = false;
        } else if (isAvatarValid) {
            this.modalEl.avatar.classList.remove('input--warning');
            this.avatarError.textContent = ``;
            this.avatarError.classList.remove('warning-text--active');
        }

        return isValid;
    }
}

export default ModalView;