const _categories = []

const getAll = () => {
    return _categories;
};

const get = id => {
    return _categories.find(item => item.id === id);
};

const create = (data) => {
    _categories.push(data);
};

const update = (old, data) => {

    var foundIndex = _categories.findIndex(item => item === old);
    _categories[foundIndex] = data;
};

const remove = id => {
    _categories.splice(id, 1);
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