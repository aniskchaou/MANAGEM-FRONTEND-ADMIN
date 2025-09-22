import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllTask = () => {
    return http.get(`${BASE_URL}/tasks`)
}

const getAllMyTask = (user) => {
    console.log(`${BASE_URL}/api/mytask/${user}`)
    return http.get(`${BASE_URL}/api/mytask/${user}`)
}

const getTopTask = () => {
    return http.get(`${BASE_URL}/tasks/top`)
}
const createTask = data => {
    return http.post(`${BASE_URL}/tasks`, data);
};

const editTask = (id, data) => {
    return http.put(`${BASE_URL}/tasks/${id}`, data);
};

const removeTask = id => {
    return http.delete(`${BASE_URL}/tasks/${id}`);
};

const getTodo = () => {
    return http.get(`${BASE_URL}/tasks/todo`)
}

const getInprogress = () => {
    return http.get(`${BASE_URL}/tasks/inprogress`)
}

const getinreview = () => {
    return http.get(`${BASE_URL}/tasks/inreview`)
}

const getCompleted = () => {
    return http.get(`${BASE_URL}/tasks/completed`)
}
const getCount = () => {
    return http.get(`${BASE_URL}/tasks/count`)
}

export default {
    getTodo,
    getinreview,
    getCompleted,
    getInprogress,
    getAllTask,
    createTask,
    editTask,
    removeTask,
    getTopTask,
    getAllMyTask,
    getCount
};