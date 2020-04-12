const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    console.log('catch');
    return next(err);
  }
};

module.exports = catchErrors;
