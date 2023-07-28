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

    /**
     * Render the relation list in adding or editing modal.
     * @param {Array} relations 
     */
    renderRelationList = (relations) => {
        relations.forEach(relation => {
            this.renderRelation(relation);
        })
    }

    /**
     * Render the relation list in filter dropdown.
     * @param {Array} relations 
     */
    renderRelationDropdownList = (relations) => {
        relations.forEach(relation => {
            this.renderRelationDropdown(relation);
        })
    }

    /**
     * Render a relation in relation list in adding or editing modal.
     * @param {Object} relation 
     */
    renderRelation = (relation) => {
        const relationTemplate = Template.relation(relation);
        this.relationListEl.innerHTML += relationTemplate;
    }

    /**
     * Render a relation in relation list in filter dropdown.
     * @param {Object} relation 
     */
    renderRelationDropdown = (relation) => {
        const relationDropDownTemplate = Template.relationDropDown(relation);
        this.relationDropDownEl.innerHTML += relationDropDownTemplate;
    }
}

export default RelationView;