const bcrypt = require('bcrypt');
const User = require('../resources/users/user.model');
const { getSingleByPassword } = require('../resources/users/user.db');

const saltRounds = 10;
// eslint-disable-next-line no-sync
const salt = bcrypt.genSaltSync(saltRounds);

const hashUserPassword = async password => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const checkUser = async user => {
  const { password } = user;
  const hash = await hashUserPassword(password);
  const userFromDb = await getSingleByPassword(hash);

  return User.toResponse(userFromDb);
};

module.exports = { hashUserPassword, checkUser };
