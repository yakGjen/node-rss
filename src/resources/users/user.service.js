// const bcrypt = require('bcrypt');
const usersRepo = require('./user.db');
const emitter = require('../../common/emitters');
const User = require('./user.model');

const { hashUserPassword } = require('../../common/hashingUserData');
// const saltRounds = 10;

const getAll = () => usersRepo.getAll();

const getSingle = id => usersRepo.getSingle(id);

const postNewUser = async user => {
  const { password } = user;
  const hash = await hashUserPassword(password);

  const transformedUser = Object.assign({}, user, { password: hash });

  return usersRepo.postNewUser(new User(transformedUser));
};

const changeUser = async (id, data) => {
  const { password } = data;
  const hash = await hashUserPassword(password);
  const transformedUser = Object.assign({}, data, { password: hash });

  return usersRepo.changeUser(id, transformedUser);
};

const deleteUser = id => usersRepo.deleteUser(id);

emitter.on('addUser', () => {
  postNewUser({
    name: 'name',
    login: 'admin',
    password: 'admin'
  });
});

module.exports = {
  getAll,
  getSingle,
  postNewUser,
  changeUser,
  deleteUser
};
