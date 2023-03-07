const express = require("express");

const dbController = require("../controllers/dbControllers");
const authController = require("../controllers/authControllers");
const encryptionController = require("../controllers/encryptionController");
const cookieController = require("../controllers/cookieControllers.js");

const router = express.Router();

router.get("/", cookieController.authenticateCookie, dbController.getUsers, (req, res) => {
  res.status(200).json(res.locals.data.rows);
});

//consider having a cache of username /email, so we
//could use the cache to check if username/email already exists
//our dbController.addUser middleware will prevent multiple
//UN/Email from occurring, however not until we make the call
//if we create a local cache to handle this it would improve
//the ease for the user rather than having to wait until the db is queried
router.post("/newUser", authController.validator, encryptionController.hashPW, dbController.addUser, (req, res) => {
  res.status(200).json({});
});
//this will probably be somewhere after the user has already been verified
router.delete("/delete/:user_name", authController.verifyUN_Pass, dbController.deleteUser, (req, res) =>
  res.status(200).json({})
);
//will only edit full_name & email
router.patch("/edit", authController.verifyUN_Pass, dbController.editUser, (req, res) => {
  res.status(200).json({});
});

// sign in -> add a middleware controller after verify to set session cookie
router.post("/:user_name", authController.verifyUN_Pass, cookieController.setCookie, (req, res) => {
  res.status(200).json(res.locals.ssid);
});

module.exports = router;
