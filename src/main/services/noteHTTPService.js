import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAllNote = () => {
    return http.get(`${BASE_URL}/api/note`)
}
const createNote = data => {
    return http.post(`${BASE_URL}/api/note`, data);
};

const editNote = (id, data) => {
    return http.put(`${BASE_URL}/api/note/${id}`, data);
};

const removeNote = id => {
    return http.delete(`${BASE_URL}/api/note/${id}`);
};

export default {
    getAllNote,
    createNote,
    editNote,
    removeNote
};