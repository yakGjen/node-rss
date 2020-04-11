const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
// const { finished } = require('stream');
// const morgan = require('morgan');
const logger = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

/* morgan.token('params', req => JSON.stringify(req.params));
morgan.token('body', req => JSON.stringify(req.body));

app.use(morgan('Url - :url Params - :params Body - :body'));*/

app.use((req, res, next) => {
  logger.info({
    url: req.url,
    params: req.params,
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
  console.log('my err');
  res.status(500).send('Internal Server Error');
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
