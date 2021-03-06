const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login.service/login.router');
// const { finished } = require('stream');
const logger = require('./common/logger');
const { checkToken } = require('./common/jwt');

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

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use(
  '/boards/:id/tasks',
  checkToken,
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);
app.use('*', (req, res, next) => {
  next(404);
});

app.use((err, req, res, next) => {
  logger.error({
    url: req.url,
    params: req.params,
    query: req.query,
    body: req.body
  });

  switch (err) {
    case 401:
      res.status(401).json('Unauthorized error');
      break;
    case 403:
      res.status(403).json('Forbidden');
      break;
    case 404:
      res.status(404).json('Not found');
      break;
    default:
      res.status(500).send('Internal Server Error');
  }

  next();
});

process.on('uncaughtException', err => {
  logger.error({
    errorType: 'uncaught exception',
    error: err
  });

  setTimeout(() => {
    const { exit } = process;
    exit(1);
  }, 1000);
});

process.on('unhandledRejection', err => {
  logger.error({
    errorType: 'unhandled rejection',
    error: err
  });
});

module.exports = app;
