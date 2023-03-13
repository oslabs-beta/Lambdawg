const express = require('express');
const cookieParser = require('cookie-parser');

const dbController = require('../controllers/dbControllers');
const authController = require('../controllers/authControllers');
const encryptionController = require('../controllers/encryptionController');
const cookieController = require('../controllers/cookieControllers.js');

const router = express.Router();

router.use(cookieParser());

router.get(
  '/',
  cookieController.authenticateCookie,
  dbController.getUser,
  (req, res) => {
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
    res.status(200).json(res.locals.user);
  }
);

router.delete(
  '/delete/:user_name',
  authController.verifyUN_Pass,
  dbController.deleteUser,
  (req, res) => res.status(200).json({})
);

//This handles the updating of the ARN and the region
router.patch(
  '/edit/:user_name',
  authController.verifyUN_Pass,
  dbController.editUser,
  (req, res) => {
    console.log(res.locals.user);
    res.status(200).json(res.locals.user);
  }
);

// sign in -
router.post(
  '/:user_name',
  authController.verifyUN_Pass,
  cookieController.setCookie,
  dbController.getUser,
  (req, res) => {
    // console.log('res.headers -> ', res.getHeaders());
    res.status(200).json(res.locals.user);
  }
);

//Logs user out by deleting cookie
router.get('/logout', cookieController.deleteCookie, (req, res) => {
  res.status(200).json();
});

module.exports = router;
