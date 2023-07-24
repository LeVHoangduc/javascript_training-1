class ModalView {
    /**
     * Constructor of ModalView object
     */
    constructor() {
        this.modalEl = document.querySelector(".modal");
        this.overlayEl = document.querySelector(".overlay");
        this.cancelBtnEl = document.querySelectorAll(".modal__top__btn,.modal__buttons__cancel");
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
            await saveContact(id, name, relation, phone, email, avatar);
            this.modalEl.classList.remove("modal--active");
            this.overlayEl.classList.remove("overlay--active");
        })
    }

    //----- VALIDATE FORM -----//
    validateForm() {

    }
}

export default ModalView;