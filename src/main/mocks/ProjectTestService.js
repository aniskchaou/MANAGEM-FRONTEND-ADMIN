const _tasks = [{
    "title": "Contruire une Maison", "starting_date": "12/12/2009",
    "ending_date": "13/12/2010", "users": "Manville Goudreau", "client": "Laure Saucier", "status": "en cours"
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