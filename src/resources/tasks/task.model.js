const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    columnId: String,
    boardId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

taskSchema.statics.toResponse = task => {
  if (!task) {
    return task;
  }
  const { title, order, description, userId, columnId, boardId, id } = task;
  return { title, order, description, userId, columnId, boardId, id };
};

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;
