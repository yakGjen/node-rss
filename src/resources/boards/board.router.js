const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const catchErrors = require('../../helpers/errorHelper');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const newBoard = req.body;
      const board = await boardsService.postBoard(new Board(newBoard));
      res.status(200).json(board);
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const board = await boardsService.getBoard(req.params.id);
      if (board) {
        res.status(200).json(board);
      } else {
        res.status(404).json('Not found');
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const modifiableData = req.body;
      const board = await boardsService.changeBoard(
        req.params.id,
        modifiableData
      );
      if (board) {
        res.status(200).json(board);
      } else {
        res.status(404).json('Not found');
      }
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const isDeleted = await boardsService.deleteBoard(req.params.id);
      if (isDeleted) {
        res.status(200).json();
      } else {
        res.status(404).json('Not found');
      }
    })
  );

module.exports = router;
