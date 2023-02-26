const express = require('express');

const dbController = require('../controllers/dbControllers');
const authController = require('../controllers/authControllers');
const encryptionController = require('../controllers/encryptionController');

const router = express.Router();

router.get('/', dbController.getUsers, (req, res) => {
  res.status(200).json(res.locals.data.rows);
});

router.post(
  '/user',
  encryptionController.hashPW,
  dbController.addUser,
  (req, res) => {
    res.status(200).json({});
  }
);

// router.delete(
//   '/',
//   authController.verifyUN_Pass,
//   dbController.deleteUser,
//   (req, res) => res.status(200).json({})
// );

router.delete(
  '/',
  authController.verifyUN_Pass,
  dbController.deleteUser,
  (req, res) => res.status(200).json({})
);

router.patch(
  '/user',
  authController.verifyUN_Pass,
  dbController.editUser,
  (req, res) => {
    res.status(200).json({});
  }
);

// sign in -> add a middleware controller after verify to set session cookie
router.post('/:user_name', authController.verifyUN_Pass, (req, res) => {
  res.status(200).json();
});

module.exports = router;
