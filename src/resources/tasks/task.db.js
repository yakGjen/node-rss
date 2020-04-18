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
  // let resultTask = false;
  // tasks.forEach(task => {
  //   if (task.id === id) {
  //     // eslint-disable-next-line guard-for-in
  //     for (const key in data) {
  //       task[key] = data[key];
  //     }
  //     resultTask = task;
  //   }
  // });
  // return resultTask;
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
  const newTasks = ['tasks'].filter(task => {
    if (task.boardId === boardId) {
      return false;
    }
    return true;
  });
  // eslint-disable-next-line no-unused-vars
  const tasks = newTasks;
};

const updateTasksDeletedUser = async userId => {
  ['tasks'].forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
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
