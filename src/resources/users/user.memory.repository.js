const User = require('./user.model');

const users = [];

users.push(new User());

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return users;
};

const getSingle = async id => {
  const user = users.find(item => item.id === id);
  return user;
};

const postNewUser = async user => {
  const isUser = users.some(item => {
    if (item.login === user.login && item.password === user.password) {
      return true;
    }
    return false;
  });

  if (!isUser) {
    users.push(user);
    return 'User was created.';
  }
  return 'Such user exists.';
};

const changeUser = async (id, data) => {
  let message = 'User was not successfully updated.';
  users.forEach(item => {
    if (item.id === id) {
      item.name = data.name;
      item.login = data.login;
      item.password = data.password;

      message = 'User was successfully updated.';
    }
  });
  return message;
};

const deleteUser = async id => {
  const index = users.findIndex(item => item.id === id);
  if (index >= 0) {
    users.splice(index, 1);
    return 'User was successfully deleted.';
  }
  return 'User was not successfully deleted.';
};

module.exports = {
  getAll,
  getSingle,
  postNewUser,
  changeUser,
  deleteUser
};
