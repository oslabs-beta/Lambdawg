const express = require('express');
const cookieParser = require('cookie-parser');

const dbController = require('../controllers/dbControllers');
const authController = require('../controllers/authControllers');
const encryptionController = require('../controllers/encryptionController');
const cookieController = require('../controllers/cookieControllers.js');

const router = express.Router();

router.use(cookieParser());
//make this to acquire 1 user rather than all users
router.get(
  '/',
  cookieController.authenticateCookie,
  dbController.getUsers,
  (req, res) => {
    console.log(res.locals.data.rows[0])
    res.status(200).json(res.locals.data.rows);
  }
);

//consider having a cache of username /email, so we
//could use the cache to check if username/email already exists
//our dbController.addUser middleware will prevent multiple
//UN/Email from occurring, however not until we make the call
//if we create a local cache to handle this it would improve
//the ease for the user rather than having to wait until the db is queried
router.post(
  '/newUser',
  authController.validator,
  encryptionController.hashPW,
  dbController.addUser,
  (req, res) => {
    res.status(200).json({});
  }
);
//this will probably be somewhere after the user has already been verified
router.delete(
  '/delete/:user_name',
  authController.verifyUN_Pass,
  dbController.deleteUser,
  (req, res) => res.status(200).json({})
);

router.patch(
  '/edit/:user_name',
  authController.verifyUN_Pass,
  dbController.editUser,
  (req, res) => {
    res.status(200).json({});
  }
);

// sign in -> add a middleware controller after verify to set session cookie
router.post(
  '/:user_name',
  authController.verifyUN_Pass,
  cookieController.setCookie,
  dbController.getUsers,
  (req, res) => {
    // console.log('res.headers -> ', res.getHeaders());
    console.log('last stop router.post', res.locals.data.rows)
    res.status(200).json(res.locals.data.rows);
  }
);

module.exports = router;