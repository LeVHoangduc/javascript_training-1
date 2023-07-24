import { MESSAGE } from "../constants/message";

class ModalView {
    /**
     * Constructor of ModalView object
     */
    constructor() {
        this.modalEl = document.querySelector(".modal");
        this.overlayEl = document.querySelector(".overlay");
        this.cancelBtnEl = document.querySelectorAll(".modal__top__btn,.modal__buttons__cancel");

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
            this.modalEl.querySelector('select[name="relation"]').value = contact.relation;
            this.modalEl.querySelector('input[name="phone"]').value = contact.phone;
            this.modalEl.querySelector('input[name="avatar"]').value = contact.avatar;
            this.modalEl.querySelector('input[name="email"]').value = contact.email;
        };
        console.log(this.modalEl.name);
    }

    //----- EVENT HANDLER -----//
    addEventCancelModal = () => {
        console.log(this.cancelBtnEl);
        this.cancelBtnEl.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.modalEl.classList.remove("modal--active");
                this.overlayEl.classList.remove("overlay--active");
            });
        })
    }

    addEventSubmission = (saveContact) => {
        this.modalEl.addEventListener("submit", async (event) => {
            event.preventDefault();
            const id = this.modalEl.getAttribute("data-id");
            const name = this.modalEl.name.value;
            const relation = this.modalEl.relation.value;
            const phone = this.modalEl.phone.value;
            const email = this.modalEl.email.value;
            const avatar = this.modalEl.avatar.value;
            if (this.validateForm(name, phone, email)) {
                this.modalEl.classList.remove("modal--active");
                this.overlayEl.classList.remove("overlay--active");
            }

        })
    }

    //----- VALIDATE FORM -----//
    validateForm(name, phone, email) {

        // Expressions for validation
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation checks
        const isNameValid = nameRegex.test(name);
        const isPhoneValid = phoneRegex.test(phone);
        const isEmailValid = emailRegex.test(email);

        if (name.trim() === '') {
            this.modalEl.name.classList.add('input--warning');
            this.nameError.textContent = `${MESSAGE.NAME_REQUIRED}`;
            this.nameError.classList.add('warning-text--active');
            return false;
        } else if (!isNameValid) {
            this.modalEl.name.classList.add('input--warning');
            this.nameError.textContent = `${MESSAGE.INVALID_NAME}`;
            this.nameError.classList.add('warning-text--active');
            return false;
        }

        if (phone.trim() === '') {
            this.modalEl.phone.classList.add('input--warning');
            this.phoneError.textContent = `${MESSAGE.PHONE_REQUIRED}`;
            this.phoneError.classList.add('warning-text--active');
            return false;
        } else if (!isPhoneValid) {
            this.modalEl.phone.classList.add('input--warning');
            this.phoneError.textContent = `${MESSAGE.INVALID_PHONE}`;
            this.phoneError.classList.add('warning-text--active');
            return false;
        }

        if (email.trim() === '') {
            this.modalEl.email.classList.add('input--warning');
            this.emailError.textContent = `${MESSAGE.EMAIL_REQUIRED}`;
            this.emailError.classList.add('warning-text--active');
            return false;
        } else if (!isEmailValid) {
            this.modalEl.email.classList.add('input--warning');
            this.emailError.textContent = `${MESSAGE.INVALID_EMAIL}`;
            this.emailError.classList.add('warning-text--active');
            return false;
        }

        this.modalEl.reset();
        return true;
    }
}

export default ModalView;