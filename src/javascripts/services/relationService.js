import { API_GATEWAY_URL } from "../constants/urls";
import apiRequest from "../helpers/api-request";

class relationService {

    /**
     * Constructor of Relation Service object.
     */
    constructor() {
        this.apiRequest = new apiRequest(API_GATEWAY_URL);
        this.path = '/relations'
    }

    /**
     * Get relation list from database.
     */
    async getRelationList() {
        const data = await this.apiRequest.get(this.path);
        return data
    }
}

export default relationService;