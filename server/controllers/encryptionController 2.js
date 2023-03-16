const bcrypt = require('bcrypt');

//Using Bcrypt to encrypt the users password
const encryptionController = {};

encryptionController.hashPW = (req, res, next) => {
  const { password_ } = req.body[0];
  bcrypt.hash(password_, 10, function (err, hash) {
    if (err) {
      console.log('Error Saving User Credentials');
      return res.status(500).send('Error Saving User Credentials');
    } else {
      console.log('Credentials Saved Successfully');

      res.locals.password_ = hash;
      return next();
    }
  });
};

module.exports = encryptionController;
