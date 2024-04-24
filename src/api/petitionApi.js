import axios from "axios";

const isMy = (petitionId) => {
    return axios.post("/petition/isMy", {id: petitionId});
}

const getById = (petitionId) => {
    return axios.get("/petition/" + petitionId)
}
export default {
    isMy,
    getById
}