import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllProject = () => {
    return http.get(`${BASE_URL}/projects`)
}

const getCount = () => {
    return http.get(`${BASE_URL}/projects/count`)
}

const getTopProject = () => {
    return http.get(`${BASE_URL}/projects/top`)
}

const findprojectByStatus = () => {
    return http.get(`${BASE_URL}/projects/status`)
}


const createProject = data => {
    return http.post(`${BASE_URL}/projects`, data);
};

const editProject = (id, data) => {
    return http.put(`${BASE_URL}/projects/get/${id}`, data);
};

const removeProject = id => {
    return http.delete(`${BASE_URL}/projects/${id}`);
};

const searchProject = title => {
    return http.get(`${BASE_URL}/projects/search/${title}`);
};


const copyProject = (id) => {
    return http.get(`${BASE_URL}/projects/copy/${id}`)
}

const uploadFile = (data) => {
    return http.post(`${BASE_URL}/projects/addfile`, data)
}

const filterProject = (data) => {
    return http.post(`${BASE_URL}/projects/filterproject`, data)
}

const getTodo = () => {
    return http.get(`${BASE_URL}/projects/todo`)
}

const getInprogress = () => {
    return http.get(`${BASE_URL}/projects/in-progress-status`)
}

const getDone = () => {
    return http.get(`${BASE_URL}/projects/done`)
}

const getBlocked = () => {
    return http.get(`${BASE_URL}/projects/blocked`)
}
export default {
    getTodo,
    getInprogress,
    getDone,
    getBlocked,
    getAllProject,
    createProject,
    editProject,
    removeProject,
    copyProject,
    searchProject,
    uploadFile,
    filterProject,
    findprojectByStatus,
    getTopProject,
    getCount
};