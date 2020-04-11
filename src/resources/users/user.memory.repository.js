const User = require('./user.model');
const { updateTasksDeletedUser } = require('../tasks/task.memory');

const users = [];

users.push(new User());

const getAll = async () => {
  // throw new Error();
  return users;
};

const getSingle = async id => {
  const user = users.find(item => item.id === id);
  return user;
};

const postNewUser = async user => {
  users.push(user);
  return user;
};

const changeUser = async (id, data) => {
  let result = false;
  users.forEach(item => {
    if (item.id === id) {
      item.name = data.name;
      item.login = data.login;
      item.password = data.password;

      result = item;
    }
  });
  return result;
};

const deleteUser = async id => {
  const index = users.findIndex(item => item.id === id);
  if (index >= 0) {
    await updateTasksDeletedUser(id);
    users.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  getSingle,
  postNewUser,
  changeUser,
  deleteUser
};
