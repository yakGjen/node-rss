const router = require('express').Router();
const Task = require('./task.model');
const taskMemory = require('./task.memory');

router.route('/').get((req, res) => {
  res.json(taskMemory.allTasks());
});

router
  .route('/:taskId')
  .get(async (req, res) => {
    const tasksByBoardId = await taskMemory.getTasksByBoardId(
      req.params.taskId
    );
    if (!tasksByBoardId) {
      res.status(404).json();
    }
    res.json(tasksByBoardId);
  })
  .put(async (req, res) => {
    const modifiableData = req.body;
    const message = await taskMemory.changeTask(
      req.params.taskId,
      modifiableData
    );
    res.json(message);
  })
  .delete(async (req, res) => {
    const message = await taskMemory.deleteTask(req.params.taskId);
    res.json(message);
  });

router.route('/').post(async (req, res) => {
  const boardId = req.boardId;
  const newTask = req.body;
  const message = await taskMemory.postTask(new Task(newTask, boardId));
  res.json(message);
});

module.exports = router;
