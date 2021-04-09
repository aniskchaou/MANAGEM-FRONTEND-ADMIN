const _tasks = [{
    "project_id": "Construire une maison", "title": "La préparation du terrain",
    "due_date": "12/12/2009", "priority": "Urgent", "users": "Melville Poissonnier", "status": "Active"
}]

const getAll = () => {
    return _tasks;
};

const get = id => {
    return _tasks.find(item => item.id === id);
};

const create = (data) => {
    _tasks.push(data);
};

const update = (old, data) => {

    var foundIndex = _tasks.findIndex(item => item === old);
    _tasks[foundIndex] = data;
};

const remove = id => {
    _tasks.splice(id, 1);
};

const removeAll = () => {

};

const findByTitle = title => {

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