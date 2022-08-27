import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllTeam = () => {
    return http.get(`${BASE_URL}/api/team`)
}
const createTeam = data => {
    return http.post(`${BASE_URL}/api/team`, data);
};

const editTeam = (id, data) => {
    return http.put(`${BASE_URL}/api/team/${id}`, data);
};

const removeTeam = id => {
    return http.delete(`${BASE_URL}/api/team/${id}`);
};

export default {
    getAllTeam,
    createTeam,
    editTeam,
    removeTeam
};