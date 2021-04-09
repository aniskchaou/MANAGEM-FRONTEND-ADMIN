const _staff = [{
    "company": "Exact Realty", "last_name": "Zerbino",
    "first_name": "Aubé", "email": "ZerbinoAube@armyspy.com", "phone": "01.42.64.12.81"
}]

const getAll = () => {
    return _staff;
};

const get = id => {
    return _staff.find(item => item.id === id);
};

const create = (data) => {
    _staff.push(data);
};

const update = (old, data) => {

    var foundIndex = _staff.findIndex(item => item === old);
    _staff[foundIndex] = data;
};

const remove = id => {
    _staff.splice(id, 1);
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