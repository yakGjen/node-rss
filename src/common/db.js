const mongoose = require('mongoose');
const { DB_PATH } = require('./config');
const emitter = require('./emitters');

const connectToDb = cb => {
  mongoose.connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', () => {
    throw new Error('error in connection to db');
  });
  db.once('open', () => {
    console.log('Connection to a database was successfully created');
    db.dropDatabase();

    emitter.emit('addUser');

    cb();
  });
};

module.exports = connectToDb;
