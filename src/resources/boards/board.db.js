const Board = require('./board.model');
/* const { deleteTasksByBoardId } = require('../tasks/task.memory');*/

const getAll = async () => {
  const responseBoards = await Board.find({});
  const resultBoards = responseBoards.map(board => Board.toResponse(board));
  return resultBoards;
};

const getBoard = async id => {
  const responseBoard = await Board.findById(id);
  const resultBoard = Board.toResponse(responseBoard);
  return resultBoard;
};

const postBoard = async board => {
  return Board.create(board);
};

const changeBoard = async (id, data) => {
  const responseData = (await Board.updateOne({ _id: id }, data)).ok;
  const responseBoard = await Board.findOne({ _id: id });
  const resultBoard = Board.toResponse(responseBoard);

  if (responseData) {
    return resultBoard;
  }
  return null;
};

const deleteBoard = async id => {
  const resultData = (await Board.deleteOne({ _id: id })).ok;
  if (resultData) {
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
