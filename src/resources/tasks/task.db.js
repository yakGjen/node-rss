const Task = require('./task.model');

const allTasks = () => {
  return Task.find({});
};

const getTasksByBoardId = async id => {
  const taskById = await Task.findOne({ _id: id });
  return Task.toResponse(taskById);
};

const postTask = async task => {
  const resultTaskObject = await Task.create(task);
  if (resultTaskObject) {
    return Task.toResponse(resultTaskObject);
  }
  return null;
};

const changeTask = async (id, data) => {
  const isOk = (await Task.updateOne({ _id: id }, data)).ok;
  if (isOk) {
    const changedTask = await getTasksByBoardId(id);
    return Task.toResponse(changedTask);
  }
  return null;
};

const deleteTask = async id => {
  const isOk = (await Task.deleteOne({ _id: id })).ok;
  if (isOk) {
    return true;
  }
  return false;
};

const deleteTasksByBoardId = async boardId => {
  const isOk = (await Task.deleteMany({ boardId })).ok;
  return isOk;
};

const updateTasksDeletedUser = async userId => {
  const isOk = (await Task.updateMany({ userId }, { userId: null })).ok;
  return isOk;
};

module.exports = {
  allTasks,
  getTasksByBoardId,
  postTask,
  changeTask,
  deleteTask,
  deleteTasksByBoardId,
  updateTasksDeletedUser
};
