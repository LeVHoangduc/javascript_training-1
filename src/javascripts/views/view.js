import ContactView from "./contactView";
import RelationView from "./relationView";
import ModalView from "./modalView";
import SnackbarView from "./snackbarView";

class View {
    /**
     * Constructor function for View object.
     */
    constructor() {
        this.contact = new ContactView;
        this.relation = new RelationView;
        this.modal = new ModalView;
        this.snackbar = new SnackbarView;
    }
}

export default View;