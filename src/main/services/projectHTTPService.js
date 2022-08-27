import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllProject = () => {
    return http.get(`${BASE_URL}/api/project`)
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
const copyProject = (id) => {
    return http.get(`${BASE_URL}/api/project/copy/${id}`)
}

const uploadFile = (data) => {
    return http.post(`${BASE_URL}/api/addfile`, data)
}

const filterProject = (data) => {
    return http.post(`${BASE_URL}/api/project/filterproject`, data)
}
export default {
    getAllProject,
    createProject,
    editProject,
    removeProject,
    copyProject,
    uploadFile,
    filterProject,
    findprojectByStatus
};