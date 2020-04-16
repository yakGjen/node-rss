const mongoose = require('mongoose');

const connectToDb = cb => {
  mongoose.connect(
    'mongodb+srv://admin:yaks123@rest-node-avlbp.mongodb.net/rss-rest?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connection to a database was successfully created');
    db.dropDatabase();
    cb();
  });
};

module.exports = connectToDb;
