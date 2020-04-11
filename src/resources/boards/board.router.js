const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
// const boardMemory = require('./board.memory.repository');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoard(req.params.id);
  if (!board) {
    res.status(404).json();
  }
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const newBoard = req.body;
  const message = await boardsService.postBoard(new Board(newBoard));
  res.json(message);
});

router.route('/:id').put(async (req, res) => {
  const modifiableData = req.body;
  const message = await boardsService.changeBoard(
    req.params.id,
    modifiableData
  );
  res.json(message);
});

router.route('/:id').delete(async (req, res) => {
  const message = await boardsService.deleteBoard(req.params.id);
  // res.status(status);
  res.json(message);
});

module.exports = router;
