const db = require('../models/dbPool');
const bcrypt = require('bcrypt');
const validator = require('validator');

const authControllers = {};
//Verifies that the User Name and Password exist and match
authControllers.verifyUN_Pass = (req, res, next) => {
  const { user_name } = req.params;
  const { password_ } = req.body[0];

  const text = 'SELECT * FROM public.users WHERE user_name = $1';
  db.query(text, [user_name], async (err, result) => {
    if (err) {
      console.log('Error Executing Authorization Query', err);
      return res.status(500).send('Error Executing Authorization Query');
    }

    if (result.rows.length === 0) {
      console.log('Invalid Credentials');
      return res.status(401).send('Invalid Credentials');
    }

    const password_hash = result.rows[0].password_;

    const match = await bcrypt.compare(password_, password_hash);

    if (!match) {
      console.log('username/pw do not match');
      return res.status(401).send('Invalid Credentials!');
    }

    console.log('User Authentication Successful');
    res.locals.user = result.rows[0];
    return next();
  });
};
//Using Validator to sanitize the incoming data, to help prevent any code injections
authControllers.validator = (req, res, next) => {
  const { full_name, user_name, email, password_ } = req.body[0];
  if (!validator.isLength(full_name, { min: 1, max: 255 })) {
    return res.status(400).send('Full Name must be between 1-255 Characters');
  }
  if (!validator.isLength(user_name, { min: 1, max: 255 })) {
    return res.status(400).send('User Name must be between 1-255 Characters');
  }
  if (!validator.isEmail(email, { min: 1, max: 255 })) {
    return res.status(400).send('Invalid Email Address');
  }
  if (!validator.isLength(password_, { min: 8, max: 255 })) {
    console.log('Password must be at least 8 characters long');
    return res.status(400).send('Password must be at least 8 characters long');
  }
  //the below regex will ensure that the user puts in a more secure password
  // else if (
  //   !validator.matches(
  //     password_,
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
  //   )
  // ) {
  //   console.log(
  //     'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
  //   );
  //   return res
  //     .status(400)
  //     .send(
  //       'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character'
  //     );
  // }
  else {
    console.log('Password is valid');
    return next();
  }
};

module.exports = authControllers;
