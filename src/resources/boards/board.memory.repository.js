const Board = require('./board.model');
const { deleteTasksByBoardId } = require('../tasks/task.memory');

const boards = [];

boards.push(new Board());

const getAll = async () => {
  return boards;
};

const getBoard = async id => {
  const board = boards.find(item => item.id === id);
  return board;
};

const postBoard = async board => {
  boards.push(board);
  return board;
};

const changeBoard = async (id, data) => {
  let message = false;
  boards.forEach(item => {
    if (item.id === id) {
      item.title = data.title;
      item.columns = data.columns;

      message = item;
    }
  });
  return message;
};

const deleteBoard = async id => {
  const index = boards.findIndex(item => item.id === id);

  if (index >= 0) {
    await deleteTasksByBoardId(boards[index].id);
    boards.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAll,
  getBoard,
  postBoard,
  changeBoard,
  deleteBoard
};
