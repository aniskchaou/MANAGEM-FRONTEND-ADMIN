import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllTask = () => {
    return http.get(`${BASE_URL}/api/task`)
}
const createTask = data => {
    return http.post(`${BASE_URL}/api/task`, data);
};

const editTask = (id, data) => {
    return http.put(`${BASE_URL}/api/task/${id}`, data);
};

const removeTask = id => {
    return http.delete(`${BASE_URL}/api/task/${id}`);
};

export default {
    getAllTask,
    createTask,
    editTask,
    removeTask
};