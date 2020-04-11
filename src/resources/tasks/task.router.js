const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const catchErrors = require('../../helpers/errorHelper');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const tasks = await taskService.allTasks();
      res.status(200).json(tasks);
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const newTask = req.body;
      const task = await taskService.postTask(new Task(newTask, req.boardId));
      res.status(200).json(task);
    })
  );

router
  .route('/:taskId')
  .get(
    catchErrors(async (req, res) => {
      const tasksByBoardId = await taskService.getTasksByBoardId(
        req.params.taskId
      );
      if (tasksByBoardId) {
        res.status(200).json(tasksByBoardId);
      } else {
        res.status(404).json('Not found');
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const modifiableData = req.body;
      const task = await taskService.changeTask(
        req.params.taskId,
        modifiableData
      );
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json('Not found');
      }
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const isDeleted = await taskService.deleteTask(req.params.taskId);
      if (isDeleted) {
        res.status(200).json();
      } else {
        res.status(200).json('Not found');
      }
    })
  );

module.exports = router;
