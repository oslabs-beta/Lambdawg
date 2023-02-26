const bcrypt = require('bcrypt');

const encryptionController = {};

encryptionController.hashPW = (req, res, next) => {
  const { password_ } = req.body[0];
  bcrypt.hash(password_, 10, function (err, hash) {
    if (err) {
      console.log('Error Saving User Credentials');
      return res.status(500).send('Error Saving User Credentials');
    } else {
      console.log('Credentials Saved Successfully');
      //   console.log('hash ', hash);
      //   console.log('res ', res.locals);
      res.locals.password_ = hash;
      //   console.log('res ', res.locals.password_);
      return next();
    }
  });
};

module.exports = encryptionController;
