import RelationService from "../services/relationService";
import Relation from "./relation";

class Relations {
  /**
   * Constructor of Relations object.
   */
  constructor() {
    this.service = new RelationService;
    this.relations;
  }

  /**
   * Initializing the Relations model.
   */
  init = async () => {
    const data = await this.service.getRelationList();
    this.relations = this.parseData(data);
  }

  /**
   * Parsing data from array to array of Relation object.
   * @param {Array} data
   * @returns {Array} array of Relation objects.
   */
  parseData = (data) => {
    return data.map((item) => new Relation(item));
  }

  /**
   * Get list of Relation objects.
   */
  getRelations = () => {
    return this.relations;
  }

  /**
   * Get relation object by ID.
   * @param {String} id 
   * @returns {Object} a relation object.
   */
  getRelationById = (id) => {
    return this.relations.find((relation) => relation.id === id);
  }
}

export default Relations;
