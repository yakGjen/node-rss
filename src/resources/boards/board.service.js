const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = id => boardsRepo.getBoard(id);

const postBoard = board => boardsRepo.postBoard(board);

const changeBoard = (id, data) => boardsRepo.changeBoard(id, data);

const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = {
  getAll,
  getBoard,
  postBoard,
  changeBoard,
  deleteBoard
};
