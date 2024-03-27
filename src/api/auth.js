import axios from "@/api/axios";

const register = (credentials) => {
    return axios.post("/auth/register", { user: credentials });
};

const login = (credentials) => {
    return axios.post("auth/login", { user: credentials });
}

export default {
    register,
    login
};
