import relationService from "../services/relationService";
import Relation from "./relation";

class Relations {

  /**
   * Constructor of Relations object
   */
  constructor() {
    this.service = new relationService;
    this.relations;
  }

  /**
   * Initializing the Relations object
   */
  async init() {
    const data = await this.service.getRelationList();
    this.relations = await this.parseData(data);
  }

  /**
   * Parsing data from JSON object to list of Relation object
   * @param {JSON} data
   */
  async parseData(data) {
    return data.map((item) => new Relation(item));
  }

  /**
   * Get list of Relation objects
   */
  getRelations() {
    return this.relations;
  }

  /**
   * Get relation name by ID
   */
  getRelationById = (id) => {
    return this.relations.find((relation) => relation.id === id);
  }
}

export default Relations;
