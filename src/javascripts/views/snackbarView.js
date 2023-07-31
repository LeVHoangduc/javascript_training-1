import Template from "../templates/template";

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
    showSnackbar = (type, message) => {
        this.snackbarEl.classList.add(`${type === "success" ? "snackbar--success" : "snackbar--warning"}`);
        this.snackbarMsgEl.innerText = message;
        setTimeout(() => {
            this.snackbarEl.classList.add("snackbar--show");
        }, 10);
        setTimeout(() => {
            this.snackbarEl.classList.remove("snackbar--show");
            setTimeout(() => {
                this.snackbarEl.innerHTML = ""
            }, 300);
        }, 3000);
    }
}

export default SnackbarView;