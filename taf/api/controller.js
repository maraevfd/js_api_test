import axios from "axios";


class ApiServiceController {
    constructor(baseUrl, defaultHeaders, timeout = 5000) {
        this.baseUrl = baseUrl;
        this.headers = defaultHeaders;
        this.timeout = timeout;
        this.request = axios.create()
    }

    async sendRequest(path, method = 'GET', payload = null, headers = null) {
        return await this.request[method.toLowerCase()](`${this.baseUrl}${path}`, payload)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }
}

export { ApiServiceController };
