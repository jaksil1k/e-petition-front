import axios from "@/api/axios";

const isMy = (petitionId) => {
    return axios.post("/petition/isMy", {id: petitionId}, {headers: {Authorization: 'Bearer ' + localStorage.getItem('user')}});
}
export default {
    isMy,

}