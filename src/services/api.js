import axios from "axios";

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/",
    timeout: 5000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

api.interceptors.response.use(
    response => {
        if (response.data.cep) {
            response.data.cep = response.data.cep.replace(/(\d{5})(\d{3})/, "$1-$2");
        }
        return response;
    },
    error => {
        if (error.response) {
            console.error("API Error Response:", error.response.data);
        } else if (error.request) {
            console.error("API No Response:", error.request);
        } else {
            console.error("API Request Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;