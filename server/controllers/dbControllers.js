const db = require('../models/dbPool');

const dbControllers = {};

dbControllers.getUsers = (req, res, next) => {
  const text = 'SELECT * FROM "public"."users"';
  db.query(text)
    .then((response) => {
      res.locals.data = response;
      return next();
    })
    .catch((err) => {
      next({
        log: 'Express Error Handler caught getUsers error',
        status: 500,
        message: {
          err: 'dbControllerTest.getUsers encountered an error',
        },
      });
    });
};

dbControllers.addUser = (req, res, next) => {   
  const text =
    'INSERT INTO "public"."users" (full_name, user_name, email, password_) VALUES ($1, $2, $3, $4)';
  const { full_name, user_name, email, password_ } = req.body[0];
  
  db.query(text, [full_name, user_name, email, password_], (err, result) => { 
    // console.log(req.body);
    // console.log(
    //   'full_name ',
    //   full_name,
    //   ' user_name ',
    //   user_name,
    //   ' email ',
    //   email,
    //   ' password_ ',
    //   password_
    // );
    if (err) {
      console.log('Error at dbControllers.addUser: ', err);
      return res.status(500).send('Error Executing Insert Query');
    }
    console.log('Add User Query Executed Successfully', result);
    next();
  });
};

dbControllers.deleteUser = (req, res, next) => {
  const text = 'DELETE FROM public.users WHERE user_name = $1';
  const { user_name } = req.body[0];

  db.query(text, [user_name], (err, result) => {
    if (err) {
      console.log('Error at dbControllers.deleteUser: ', err);
      return res.status(500).send('Error Executing Delete Query');
    }
    if (result.rowCount === 0) {
      console.log('User Not Found');
      return res.status(404).send('User Not Found');
    }
    console.log('Delete User Query Executed Successfully', result);
    next();
  });
};
//
//Under Construction -Ted
//
dbControllers.editUser = (req, res, next) => {
  const text =
    'UPDATE public.users SET column1 = $1, column2 = $2 WHERE id = $3';
  const { full_name, user_name, email, password_ } = req.body[0];
  db.query(text, [full_name, user_name, email, password_], (err, result) => {
    next();
  });
};

module.exports = dbControllers;
