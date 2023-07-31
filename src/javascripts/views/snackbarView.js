import wait from "../helpers/wait";

class SnackbarView {

    /**
     * Constructor function for SnackbarView object.
     */
    constructor() {
        this.snackbarEl = document.querySelector(".snackbar");
        this.snackbarMsgEl = this.snackbarEl.querySelector(".snackbar__message");
    }

    //----- RENDERING -----//

    /**
     * Display the snackbar.
     * @param {String} message 
     */
    showSnackbar = async (type, message) => {
        this.snackbarEl.classList.add(`snackbar--${type}`);
        this.snackbarMsgEl.innerText = message;

        await wait(10);
        this.snackbarEl.classList.add("snackbar--show");

        await wait(3000);
        this.snackbarEl.classList.remove("snackbar--show");
    }
}

export default SnackbarView;