import Template from "../templates/template";

class RelationView {
    /**
     * Constructor of RelationView object
     */
    constructor() {
        this.relationListEl = document.querySelector(".relation-list");
    }

    //----- RENDERING -----//
    renderRelationList(relations) {
        relations.forEach(relation => {
            this.renderRelation(relation);
        })
    }

    renderRelation(relation) {
        const relationTemplate = Template.relation(relation);
        this.relationListEl.innerHTML += relationTemplate;
    }
}

export default RelationView;