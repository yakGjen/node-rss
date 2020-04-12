const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
// const { finished } = require('stream');
const logger = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  logger.info({
    url: req.url,
    params: req.params,
    query: req.query,
    body: req.body
  });
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();

  /* finished(res, () => {
    console.log('fin:', req.params);
  });*/
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(
  '/boards/:id/tasks',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);
app.use('*', (req, res) => {
  res.status(404).json('Not found.');
});

// eslint-disable-next-line handle-callback-err
app.use((err, req, res, next) => {
  console.log('next:', err);

  logger.error({
    url: req.url,
    params: req.params,
    query: req.query,
    body: req.body
  });

  switch (err) {
    case 404:
      res.status(404).json('Not found');
      break;
    default:
      res.status(500).send('Internal Server Error');
  }

  next();
});

process.on('uncaughtException', () => {
  console.log('Smth an uncught error.');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

// eslint-disable-next-line handle-callback-err
process.on('unhandledRejection', err => {
  console.log('Smth an async error.');
  console.log(err);
});

module.exports = app;
