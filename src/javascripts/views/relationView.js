import Template from "../templates/template";

class RelationView {
    /**
     * Constructor of RelationView object
     */
    constructor() {
        this.relationListEl = document.querySelector(".relation-list");
        this.relationDropDownEl = document.querySelector(".relation-dropdown");
    }

    //----- RENDERING -----//
    renderRelationList(relations) {
        relations.forEach(relation => {
            this.renderRelation(relation);
        })
    }

    renderRelationDropdownList(relations) {
        relations.forEach(relation => {
            this.renderRelationDropdown(relation);
        })
    }

    renderRelation(relation) {
        const relationTemplate = Template.relation(relation);
        this.relationListEl.innerHTML += relationTemplate;
    }

    renderRelationDropdown(relation) {
        const relationDropDownTemplate = Template.relationDropDown(relation);
        this.relationDropDownEl.innerHTML += relationDropDownTemplate;
    }
}

export default RelationView;