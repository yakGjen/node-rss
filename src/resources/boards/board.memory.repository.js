const Board = require('./board.model');

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
  /* const isBoard = boards.some(item => {
    if (item.id === board.id) {
      return true;
    }
    return false;
  });

  if (!isBoard) {
    boards.push(board);
    return 'Board was created.';
  }
  return 'Board was not created.';*/
  boards.push(board);
  return board;
};

const changeBoard = async (id, data) => {
  let message = 'Board was not successfully updated.';
  boards.forEach(item => {
    if (item.id === id) {
      item.title = data.title;
      item.columns = data.columns;

      message = 'Board was successfully updated.';
    }
  });
  return message;
};

const deleteBoard = async id => {
  const index = boards.findIndex(item => item.id === id);

  if (index >= 0) {
    boards.splice(index, 1);
    return 'Board was successfully deleted.';
  }
  return 'Board was not successfully deleted.';
};

module.exports = {
  getAll,
  getBoard,
  postBoard,
  changeBoard,
  deleteBoard
};
