const router = require('express').Router();
const Task = require('./task.model');
// const taskMemory = require('./task.memory');
const taskService = require('./task.service');

router.route('/').get((req, res) => {
  res.json(taskService.allTasks());
});

router
  .route('/:taskId')
  .get(async (req, res) => {
    const tasksByBoardId = await taskService.getTasksByBoardId(
      req.params.taskId
    );
    if (!tasksByBoardId) {
      res.status(404).json();
    }
    res.json(tasksByBoardId);
  })
  .put(async (req, res) => {
    const modifiableData = req.body;
    const message = await taskService.changeTask(
      req.params.taskId,
      modifiableData
    );
    res.json(message);
  })
  .delete(async (req, res) => {
    const message = await taskService.deleteTask(req.params.taskId);
    res.json(message);
  });

router.route('/').post(async (req, res) => {
  const boardId = req.boardId;
  const newTask = req.body;
  const message = await taskService.postTask(new Task(newTask, boardId));
  res.json(message);
});

module.exports = router;
