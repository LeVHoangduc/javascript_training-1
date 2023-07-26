class apiRequest {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    get(path, id) {
        return this.sendRequest(`${path}${id ? `/${id}` : ''}`, 'GET');
    }

    post(path, data) {
        return this.sendRequest(`${path}`, 'POST', data);
    }

    put(path, id, data) {
        return this.sendRequest(`${path}/${id}`, 'PUT', data);
    }

    patch(path, id, data) {
        return this.sendRequest(`${path}/${id}`, 'PATCH', data);
    }

    delete(path, id) {
        return this.sendRequest(`${path}/${id}`, 'DELETE');
    }

    /**
     * Send the HTTP request to the API_GATEWAY_URL endpoint
     * @param {String} path 
     * @param {String} method 
     * @param {object} body 
     */
    async sendRequest(path, method, body) {
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
            alert(`${error.message}: '${method}' from API_GATEWAY_URL${path}`);
            throw error;
        }

    }
}

export default apiRequest;