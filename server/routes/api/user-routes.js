const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// Added authMiddleware to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware);

router.route()

router.route('/login').post(login);



module.exports = router;
