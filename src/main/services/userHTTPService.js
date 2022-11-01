import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllUser = () => {
    return http.get(`${BASE_URL}/api/user`)
}
const createUser = data => {
    return http.post(`${BASE_URL}/api/user`, data);
};

const editUser = (id, data) => {
    return http.put(`${BASE_URL}/api/user/${id}`, data);
};

const removeUser = id => {
    return http.delete(`${BASE_URL}/api/user/${id}`);
};
const getCount = () => {
    return http.get(`${BASE_URL}/api/count/user/all`)
}
const login = data => {
    return http.post(`${BASE_URL}/api/user/login`, data);
};
export default {
    getAllUser,
    createUser,
    editUser,
    removeUser,
    getCount,
    login
};