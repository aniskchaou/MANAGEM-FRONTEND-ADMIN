const _user = [{
    "first_name": "Laurent", "last_name": "Fecteau",
    "email": "LaurentFecteau@teleworm.us", "phone": "04.76.36.38.36",
    "groups": "Nomal", "state": "Active"
}]

const getAll = () => {
    return _user;
};

const get = id => {
    return _user.find(item => item.id === id);
};

const create = (data) => {
    _user.push(data);
};

const update = (old, data) => {

    var foundIndex = _user.findIndex(item => item === old);
    _user[foundIndex] = data;
};

const remove = id => {
    _user.splice(id, 1);
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