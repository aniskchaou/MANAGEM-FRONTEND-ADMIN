import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllProject = () => {
    return http.get(`${BASE_URL}/api/project`)
}

const getCount = () => {
    return http.get(`${BASE_URL}/api/count/project/all`)
}

const getTopProject = () => {
    return http.get(`${BASE_URL}/api/count/project/top`)
}

const findprojectByStatus = () => {
    return http.get(`${BASE_URL}/api/findprojectbystatus`)
}


const createProject = data => {
    return http.post(`${BASE_URL}/api/project`, data);
};

const editProject = (id, data) => {
    return http.put(`${BASE_URL}/api/project/${id}`, data);
};

const removeProject = id => {
    return http.delete(`${BASE_URL}/api/project/${id}`);
};

const searchProject = title => {
    return http.get(`${BASE_URL}/api/project/search/${title}`);
};


const copyProject = (id) => {
    return http.get(`${BASE_URL}/api/project/copy/${id}`)
}

const uploadFile = (data) => {
    return http.post(`${BASE_URL}/api/addfile`, data)
}

const filterProject = (data) => {
    return http.post(`${BASE_URL}/api/project/filterproject`, data)
}

const getTodo = () => {
    return http.get(`${BASE_URL}/api/count/project/todo`)
}

const getInprogress = () => {
    return http.get(`${BASE_URL}/api/count/project/inprogress`)
}

const getDone = () => {
    return http.get(`${BASE_URL}/api/count/project/done`)
}

const getBlocked = () => {
    return http.get(`${BASE_URL}/api/count/project/blocked`)
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