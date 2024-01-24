const url = "/api"

class ApiService {
    static async get (endpoint: string) {
        const result = await fetch(`${url}${endpoint}`);

        const data = await result.json()

        return data;
    }

    static async post (endpoint: string, payload: object | any) {
        const result = await fetch(`${url}${endpoint}`, { method: "post", body: payload });

        const data = await result.json()

        return data;
    }
}

export default ApiService;