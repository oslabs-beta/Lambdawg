const express = require('express');

const dbController = require('../controllers/dbControllers');
const authController = require('../controllers/authControllers');

const router = express.Router();

router.get('/', dbController.getUsers, (req, res) => {
  res.status(200).json(res.locals.data.rows);
});

router.post('/', dbController.addUser, (req, res) => res.status(200).json({}));

router.delete(
  '/',
  authController.verifyUN_Pass,
  dbController.deleteUser,
  (req, res) => res.status(200).json({})
);

router.patch(
  '/',
  authController.verifyUN_Pass,
  dbController.editUser,
  (req, res) => {
    res.status(200).json({});
  }
);

module.exports = router;
