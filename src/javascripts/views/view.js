import ContactView from "./contactView";
import RelationView from "./relationView";
import ModalView from "./modalView";

class View {
    constructor() {
        this.contact = new ContactView;
        this.relation = new RelationView;
        this.modal = new ModalView;
    }
}

export default View;