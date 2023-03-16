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

// Create new user
router.post(
  '/newUser',
  authController.validator,
  encryptionController.hashPW,
  dbController.addUser,
  dbController.getUser,
  (req, res) => {
    res.status(200).json(res.locals.data.rows[0]);
  }
);

// Delete user
router.delete(
  '/delete/:user_name',
  authController.verifyUN_Pass,
  dbController.deleteUser,
  (req, res) => res.status(200).json({})
);

// Updates ARN and region
router.patch(
  '/edit/:user_name',
  authController.verifyUN_Pass,
  dbController.editUser,
  (req, res) => {
    console.log(res.locals.user);
    res.status(200).json(res.locals.user);
  }
);

// Sign In
router.post(
  '/:user_name',
  authController.verifyUN_Pass,
  cookieController.setCookie,
  dbController.getUser,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

// Delete JWT 
router.get('/logout', cookieController.deleteCookie, (req, res) => {
  res.status(200).json();
});

module.exports = router;
