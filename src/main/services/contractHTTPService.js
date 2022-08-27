import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllContract = () => {
    return http.get(`${BASE_URL}/api/contract`)
}
const createContract = data => {
    return http.post(`${BASE_URL}/api/contract`, data);
};

const editContract = (id, data) => {
    return http.put(`${BASE_URL}/api/contract/${id}`, data);
};

const removeContract = id => {
    return http.delete(`${BASE_URL}/api/contract/${id}`);
};

export default {
    getAllContract,
    createContract,
    editContract,
    removeContract
};