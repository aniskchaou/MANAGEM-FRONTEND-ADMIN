import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllContract = () => {
    return http.get(`${BASE_URL}/contracts`)
}
const createContract = data => {
    return http.post(`${BASE_URL}/contracts`, data);
};

const editContract = (id, data) => {
    return http.put(`${BASE_URL}/contracts/${id}`, data);
};

const removeContract = id => {
    return http.delete(`${BASE_URL}/contracts/${id}`);
};

export default {
    getAllContract,
    createContract,
    editContract,
    removeContract
};