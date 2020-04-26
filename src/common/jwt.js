/* eslint-disable callback-return */
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const createToken = ({ id, login }) => {
  const playload = { id, login };
  const token = jwt.sign(playload, JWT_SECRET_KEY);
  return { token };
};

const checkToken = (req, res, next) => {
  console.log('HEADERS', req.headers);
  const authHeader = req.headers.authorization;

  if (authHeader) {
    console.log('OK OK');

    const token = authHeader.split(' ')[1];
    console.log('HEA', token);

    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        next(401);
      } else {
        next();
      }
    });
  } else {
    next(401);
  }
};

module.exports = { createToken, checkToken };
