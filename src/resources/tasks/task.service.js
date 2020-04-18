// const tasksRepo = require('./task.memory');
const tasksRepo = require('./task.db');

const allTasks = () => tasksRepo.allTasks();

const getTasksByBoardId = id => tasksRepo.getTasksByBoardId(id);

const postTask = task => tasksRepo.postTask(task);

const changeTask = (id, data) => tasksRepo.changeTask(id, data);

const deleteTask = id => tasksRepo.deleteTask(id);

const deleteTasksByBoardId = boardId => tasksRepo.deleteTasksByBoardId(boardId);

const updateTasksDeletedUser = userId =>
  tasksRepo.updateTasksDeletedUser(userId);

module.exports = {
  allTasks,
  getTasksByBoardId,
  postTask,
  changeTask,
  deleteTask,
  deleteTasksByBoardId,
  updateTasksDeletedUser
};
