const _skills = []

const getAll = () => {
    return _skills;
};

const get = id => {
    return _skills.find(item => item.id === id);
};

const create = (data) => {
    _skills.push(data);
};

const update = (old, data) => {

    var foundIndex = _skills.findIndex(item => item === old);
    _skills[foundIndex] = data;
};

const remove = id => {
    _skills.splice(id, 1);
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