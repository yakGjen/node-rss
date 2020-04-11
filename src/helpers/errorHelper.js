const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

module.exports = catchErrors;

/* async (req, res, next) => {
      try {
        const users = await usersService.getAll();
        res.status(200).json(users.map(User.toResponse));
      } catch (err) {
        console.log('catch');
        // eslint-disable-next-line callback-return
        next(err);
      }
    }*/
