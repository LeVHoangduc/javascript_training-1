class ModalView {
    /**
     * Constructor of ModalView object
     */
    constructor() {
        this.modalEl = document.querySelector(".modal");
        this.overlayEl = document.querySelector(".overlay");
        this.cancelBtnEl = document.querySelector(".modal__top__btn");
    }

    //----- RENDERING -----//
    renderModal() {
        this.modalEl.classList.add("modal--active");
        this.overlayEl.classList.add("overlay--active");
    }

    //----- EVENT HANDLER -----//
    addEventCancelModal = () => {
        this.cancelBtnEl.addEventListener("click", () => {
            this.modalEl.classList.remove("modal--active");
            this.overlayEl.classList.remove("overlay--active");
        });
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
        })
    }
}

export default ModalView;