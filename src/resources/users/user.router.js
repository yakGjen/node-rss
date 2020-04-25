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
      const newUser = await usersService.postNewUser(req.body);
      res.status(200).json(User.toResponse(newUser));
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res, next) => {
      const user = await usersService.getSingle(req.params.id);
      if (user) {
        res.json(User.toResponse(user));
      } else {
        // eslint-disable-next-line callback-return
        next(404);
      }
    })
  )
  .put(
    catchErrors(async (req, res, next) => {
      const id = req.params.id;
      const modifiabledData = req.body;
      const user = await usersService.changeUser(id, modifiabledData);
      if (user) {
        res.status(200).json(user);
      } else {
        // eslint-disable-next-line callback-return
        next(404);
      }
    })
  )
  .delete(
    catchErrors(async (req, res, next) => {
      const id = req.params.id;
      const isDeleted = await usersService.deleteUser(id);
      if (isDeleted) {
        res.status(200).json();
      } else {
        // eslint-disable-next-line callback-return
        next(404);
      }
    })
  );

module.exports = router;
