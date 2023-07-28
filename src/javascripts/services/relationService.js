import { API_GATEWAY_URL } from "../constants/urls";
import apiRequest from "../helpers/apiRequest";

class RelationService {

    /**
     * Constructor of Relation Service object.
     */
    constructor() {
        this.apiRequest = new apiRequest(API_GATEWAY_URL, '/relations');
    }

    /**
     * Get relation list from database.
     * @returns {Array} relation list.
     */
    getRelationList = async () => {
        const data = await this.apiRequest.get();
        return data
    }
}

export default RelationService;