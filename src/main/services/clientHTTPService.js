import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllClient = () => {
    return http.get(`${BASE_URL}/clients`)
}
const createClient = data => {
    return http.post(`${BASE_URL}/clients`, data);
};

const editClient = (id, data) => {
    return http.put(`${BASE_URL}/clients/${id}`, data);
};

const removeClient = id => {
    return http.delete(`${BASE_URL}/clients/${id}`);
};
const getCount = () => {
    return http.get(`${BASE_URL}/api/count/client/all`)
}
export default {
    getAllClient,
    createClient,
    editClient,
    removeClient,
    getCount
};