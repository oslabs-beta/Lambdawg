const db = require('../models/dbPool');
const authControllers = {};

authControllers.verifyUN_Pass = (req, res, next) => {
  const { user_name, password_ } = req.body[0];
  console.log(user_name, password_);
  const text =
    'SELECT * FROM public.users WHERE user_name = $1 AND password_ = $2';
  db.query(text, [user_name, password_], (err, result) => {
    if (err) {
      console.log('Error Executing Authorization Query', err);
      return res.status(500).send('Error Executing Authorization Query');
    }
    if (result.rows.length === 0) {
      console.log('Invalid Credentials');
      return res.status(401).send('Invalid Credentials');
    }
    console.log('User Authentication Successful');
    return next();
  });
};

module.exports = authControllers;
