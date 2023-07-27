import formValidator from "../helpers/form-validate";
import { MESSAGE } from "../constants/constants";
class ModalView {
    /**
     * Constructor of ModalView object.
     */
    constructor() {
        this.modalEl = document.querySelector(".modal");
        this.confirmModalEl = document.querySelector(".confirm-modal");

        this.overlayEl = document.querySelector(".overlay");
        this.cancelBtnEl = document.querySelectorAll(".modal__top__btn,.modal__buttons__cancel,.confirm-modal__buttons__cancel,.overlay");
        this.confirmBtnEl = this.confirmModalEl.querySelector(".confirm-modal__buttons__confirm");
    }

    //----- RENDERING -----//

    /**
     * Display the modal for adding and editing a contact.
     * @param {String} contactId 
     * @param {Object} contact 
     */
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

    /**
     * Display confirm modal when delete a contact.
     * @param {Object} contact 
     */
    renderConfirmModal = (contact) => {
        this.confirmModalEl.classList.add('confirm-modal--active');
        this.overlayEl.classList.add("overlay--active");
        this.confirmModalEl.setAttribute('data-id', contact.id);
        this.confirmModalEl.querySelector('.confirm-modal__message').innerText = `${MESSAGE.CONFIRM_MESSAGE}${contact.name}`;
    }

    //----- EVENT HANDLER -----//

    /**
     * Add event listener for cancel modals.
     */
    addEventCancelModal = () => {
        this.cancelBtnEl.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.resetModal();
            });
        })
    }

    /**
     * Add event listener for form submission.
     * @param {Function} saveContact 
     */
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
            if (formValidator(contact)) {
                saveContact(contact);
                this.resetModal();
            }
        })
    }

    /**
     * Add event listener for Yes button in Confirm delete modal.
     * @param {Function} deleteContact 
     */
    addEventDeleteConfirmed = (deleteContact) => {
        this.confirmBtnEl.addEventListener("click", () => {
            const id = this.confirmModalEl.getAttribute("data-id");
            this.confirmModalEl.classList.remove("confirm-modal--active");
            this.overlayEl.classList.remove("overlay--active");
            deleteContact(id);
        })
    }

    //----- OTHER FUNCTIONS -----//

    /**
     * Reset modals status.
     */
    resetModal = () => {
        this.modalEl.classList.remove("modal--active");
        this.confirmModalEl.classList.remove("confirm-modal--active");
        this.overlayEl.classList.remove("overlay--active");
        this.modalEl.removeAttribute("data-id");
        this.modalEl.reset();
        this.modalEl.querySelectorAll('input').forEach((El) => {
            El.classList.remove('input--warning');
            El.nextElementSibling.classList.remove('warning-text--active');
        });
    }
}

export default ModalView;