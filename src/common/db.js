const mongoose = require('mongoose');
const { DB_PATH } = require('./config');

const connectToDb = cb => {
  mongoose.connect(DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connection to a database was successfully created');
    db.dropDatabase();
    cb();
  });
};

module.exports = connectToDb;
