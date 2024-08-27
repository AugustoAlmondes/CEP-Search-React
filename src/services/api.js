import axios from "axios";

// 64606255/json/

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;