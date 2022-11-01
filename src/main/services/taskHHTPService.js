import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllTask = () => {
    return http.get(`${BASE_URL}/api/task`)
}

const getAllMyTask = (user) => {
    console.log(`${BASE_URL}/api/mytask/${user}`)
    return http.get(`${BASE_URL}/api/mytask/${user}`)
}

const getTopTask = () => {
    return http.get(`${BASE_URL}/api/count/task/top`)
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

const getTodo = () => {
    return http.get(`${BASE_URL}/api/count/task/todo`)
}

const getInprogress = () => {
    return http.get(`${BASE_URL}/api/count/task/inprogress`)
}

const getinreview = () => {
    return http.get(`${BASE_URL}/api/count/task/inreview`)
}

const getCompleted = () => {
    return http.get(`${BASE_URL}/api/count/task/completed`)
}
const getCount = () => {
    return http.get(`${BASE_URL}/api/count/task/all`)
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