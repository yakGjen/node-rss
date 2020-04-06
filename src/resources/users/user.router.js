const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getSingle(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const newUser = req.body;
  const message = await usersService.postNewUser(new User(newUser));
  // await usersService.postNewUser(new User(newUser));
  res.json(User.toResponse(message));
  // res.json(message);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const modifiabledData = req.body;
  // const message = await usersService.changeUser(id, modifiabledData);
  await usersService.changeUser(id, modifiabledData);
  // res.json(message);
  res.json();
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const message = await usersService.deleteUser(id);
  res.json(message);
});

module.exports = router;
