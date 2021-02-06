const _location = []

const getAll = () => {
    return _location;
};

const get = id => {
    return _location.find(item => item.id === id);
};

const create = (data) => {
    _location.push(data);
};

const update = (old, data) => {

    var foundIndex = _location.findIndex(item => item === old);
    _location[foundIndex] = data;
};

const remove = id => {
    _location.splice(id, 1);
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