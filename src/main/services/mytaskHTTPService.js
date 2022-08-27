import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllMyTask = () => {
    return http.get(`${BASE_URL}/api/mytask`)
}
const createMyTask = data => {
    return http.post(`${BASE_URL}/api/mytask`, data);
};

const editMyTask = (id, data) => {
    return http.put(`${BASE_URL}/api/mytask/${id}`, data);
};

const removeMyTask = id => {
    return http.delete(`${BASE_URL}/api/mytask/${id}`);
};

export default {
    getAllMyTask,
    createMyTask,
    editMyTask,
    removeMyTask
};