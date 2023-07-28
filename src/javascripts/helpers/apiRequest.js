class apiRequest {

    constructor(baseUrl, path) {
        this.baseUrl = baseUrl;
        this.path = path;
    }

    get = (id) => {
        return this.sendRequest(`${this.path}${id ? `/${id}` : ''}`, 'GET');
    }

    post = (data) => {
        return this.sendRequest(`${this.path}`, 'POST', data);
    }

    put = (id, data) => {
        return this.sendRequest(`${this.path}/${id}`, 'PUT', data);
    }

    patch = (id, data) => {
        return this.sendRequest(`${this.path}/${id}`, 'PATCH', data);
    }

    delete = (id) => {
        return this.sendRequest(`${this.path}/${id}`, 'DELETE');
    }

    /**
     * Send the HTTP request to the API_GATEWAY_URL endpoint.
     * @param {String} method 
     * @param {Object} body
     * @return {Object|Array} response from server.
     */
    sendRequest = async (path, method, body) => {
        const url = `${this.baseUrl}${path}`;
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Error while sending request');
            }
        } catch (error) {
            throw error;
        }

    }
}

export default apiRequest;