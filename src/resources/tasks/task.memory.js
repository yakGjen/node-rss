const Task = require('./task.model');

let tasks = [];

tasks.push(new Task());

const allTasks = () => {
  return tasks;
};

const getTasksByBoardId = async id => {
  const tasksByBoardId = tasks.filter(item => item.boardId === id);
  const tasksById = tasks.find(item => item.id === id);

  if (tasksByBoardId.length > 0) {
    return tasksByBoardId;
  }
  if (tasksById) {
    return tasksById;
  }
  return false;
};

const postTask = async task => {
  tasks.push(task);
  return task;
};

const changeTask = async (id, data) => {
  let resultTask = false;
  tasks.forEach(task => {
    if (task.id === id) {
      // eslint-disable-next-line guard-for-in
      for (const key in data) {
        task[key] = data[key];
      }
      resultTask = task;
    }
  });
  return resultTask;
};

const deleteTask = async id => {
  const index = tasks.findIndex(task => task.id === id);

  if (index >= 0) {
    tasks.splice(index, 1);
    return true;
  }
  return false;
};

const deleteTasksByBoardId = async boardId => {
  const newTasks = tasks.filter(task => {
    if (task.boardId === boardId) {
      return false;
    }
    return true;
  });
  tasks = newTasks;
};

const updateTasksDeletedUser = async userId => {
  tasks.forEach(task => {
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
