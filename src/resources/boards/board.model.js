const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    title: String,
    columns: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);

boardSchema.statics.toResponse = board => {
  if (!board) {
    return board;
  }
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
