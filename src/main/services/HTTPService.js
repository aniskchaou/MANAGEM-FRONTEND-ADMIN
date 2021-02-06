import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getAll = () => {
    return http.get("/posts");
};

const get = id => {
    return http.get(`${BASE_URL}/tutorials/${id}`);
};

const create = data => {
    return http.post(`${BASE_URL}/tutorials`, data);
};

const update = (id, data) => {
    return http.put(`${BASE_URL}/tutorials/${id}`, data);
};

const remove = id => {
    return http.delete(`${BASE_URL}/tutorials/${id}`);
};

const removeAll = () => {
    return http.delete(`${BASE_URL}/tutorials`);
};

const findByTitle = title => {
    return http.get(`${BASE_URL}/tutorials?title=${title}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
};