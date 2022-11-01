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
const getTodo = () => {
    return http.get(`${BASE_URL}/api/count/mytask/todo`)
}

const getInprogress = () => {
    return http.get(`${BASE_URL}/api/count/mytask/inprogress`)
}

const getinreview = () => {
    return http.get(`${BASE_URL}/api/count/mytask/inreview`)
}

const getCompleted = () => {
    return http.get(`${BASE_URL}/api/count/mytask/completed`)
}
export default {
    getTodo,
    getinreview,
    getCompleted,
    getInprogress,
    getAllMyTask,
    createMyTask,
    editMyTask,
    removeMyTask
};