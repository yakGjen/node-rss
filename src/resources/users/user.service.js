const usersRepo = require('./user.db');

const getAll = () => usersRepo.getAll();

const getSingle = id => usersRepo.getSingle(id);

const postNewUser = user => usersRepo.postNewUser(user);

const changeUser = (id, data) => usersRepo.changeUser(id, data);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = {
  getAll,
  getSingle,
  postNewUser,
  changeUser,
  deleteUser
};
