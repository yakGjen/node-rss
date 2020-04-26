const router = require('express').Router();
const catchErrors = require('../../helpers/errorHelper');
const { checkUser } = require('../../common/hashingUserData');
const { createToken } = require('../../common/jwt');

router.route('/').post(
  catchErrors(async (req, res, next) => {
    const user = req.body;
    const userFromDb = await checkUser(user);
    if (userFromDb) {
      const token = createToken(userFromDb);
      res.status(200).json(token);
    } else {
      // eslint-disable-next-line callback-return
      next(403);
    }
  })
);

module.exports = router;
