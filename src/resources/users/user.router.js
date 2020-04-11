const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const catchErrors = require('../../helpers/errorHelper');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await usersService.getAll();
      res.status(200).json(users.map(User.toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const newUser = await usersService.postNewUser(new User(req.body));
      res.status(200).json(User.toResponse(newUser));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res) => {
      const user = await usersService.getSingle(req.params.id);
      if (user) {
        res.json(User.toResponse(user));
      } else {
        res.status(404).json('Not found.');
      }
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const id = req.params.id;
      const modifiabledData = req.body;
      const user = await usersService.changeUser(id, modifiabledData);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json('Not found.');
      }
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const id = req.params.id;
      const isDeleted = await usersService.deleteUser(id);
      if (isDeleted) {
        res.status(200).json();
      } else {
        res.status(404).json('Not found');
      }
    })
  );

module.exports = router;
