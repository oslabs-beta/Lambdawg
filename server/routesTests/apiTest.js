const express = require('express');

const dbControllerTest = require('../controllers/dbControllersTest');

const router = express.Router();

router.get('/', dbControllerTest.getUsers, (req, res) => {
  res.status(200).json(res.locals.data.rows);
});

router.post('/');

module.exports = router;
