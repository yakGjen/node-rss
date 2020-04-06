const uuid = require('uuid');

class Task {
  constructor(
    {
      id = uuid(),
      title = 'task',
      order = 0,
      description = 'new task',
      userId = null,
      boardId = null,
      columnId = null
    } = {},
    boardID = null
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    if (!boardId) {
      this.boardId = boardID;
    } else {
      this.boardId = boardId;
    }
    this.columnId = columnId;
  }
}

module.exports = Task;
