const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

columnSchema.statics.toResponse = task => {
  if (!task) {
    return task;
  }
  const { title, order, id } = task;
  return { title, order, id };
};

const Column = new mongoose.model('Column', columnSchema);

module.exports = Column;
