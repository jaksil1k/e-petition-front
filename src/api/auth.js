import axios from "axios";

const register = (credentials) => {
    return axios.post("/auth/register", { credentials });
};

const login = (credentials) => {
    return axios.post("/auth/login", { credentials });
}

export default {
    register,
    login
};
