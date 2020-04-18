/* eslint-disable callback-return */
const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const catchErrors = require('../../helpers/errorHelper');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const tasks = await taskService.allTasks();
      const result = tasks.map(task => Task.toResponse(task));
      res.status(200).json(result);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const newTask = req.body;
      const task = await taskService.postTask(
        Object.assign({}, newTask, { boardId: req.boardId })
      );
      res.status(200).json(task);
    })
  );

router
  .route('/:taskId')
  .get(
    catchErrors(async (req, res, next) => {
      const tasksByBoardId = await taskService.getTasksByBoardId(
        req.params.taskId
      );
      if (tasksByBoardId) {
        res.status(200).json(tasksByBoardId);
      } else {
        next(404);
      }
    })
  )
  .put(
    catchErrors(async (req, res, next) => {
      const modifiableData = req.body;
      const task = await taskService.changeTask(
        req.params.taskId,
        modifiableData
      );
      if (task) {
        res.status(200).json(task);
      } else {
        next(404);
      }
    })
  )
  .delete(
    catchErrors(async (req, res, next) => {
      const isDeleted = await taskService.deleteTask(req.params.taskId);
      if (isDeleted) {
        res.status(200).json();
      } else {
        next(404);
      }
    })
  );

module.exports = router;
