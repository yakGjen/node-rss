const User = require('./user.model');
const { updateTasksDeletedUser } = require('../tasks/task.db');

const getAll = async () => {
  const responsUsers = await User.find({});
  const resultUsers = responsUsers.map(user => User.toResponse(user));
  return resultUsers;
};

const getSingle = async id => {
  const user = await User.findOne({ _id: id });
  // return User.toResponse(user);
  return user;
};

const getSingleByPassword = async password => {
  const result = await User.findOne({ password });
  return result;
};

const postNewUser = async user => {
  return User.create(user);
};

const changeUser = async (id, data) => {
  const isOk = (await User.updateOne({ _id: id }, data)).ok;
  if (isOk) {
    return await getSingle(id);
  }
  return null;
};

const deleteUser = async id => {
  const isOk = (await User.deleteOne({ _id: id })).ok;
  if (isOk) {
    await updateTasksDeletedUser(id);
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  getSingle,
  getSingleByPassword,
  postNewUser,
  changeUser,
  deleteUser
};
