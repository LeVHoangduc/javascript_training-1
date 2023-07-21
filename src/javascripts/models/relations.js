import Service from "../services/service";
import Relation from "./relation";

class Relations {
  /**
   * Constructor of Relations object
   */
  constructor() {
    this.relations;
  }

  /**
   * Initializing the Relations object
   */
  async init() {
    const data = await Service.getRelationList();
    this.relations = this.parseData(data);
  }

  /**
   * Parsing data from JSON object to list of Relation object
   * @param {JSON} data
   */
  parseData(data) {
    return data.map((item) => new Relation(item));
  }

  /**
   * Get list of Relation objects
   */
  getRelations() {
    return this.relations;
  }
}

export default Relations;
