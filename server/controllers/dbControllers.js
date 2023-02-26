// const db = require('../models/dbPool');

// const dbControllers = {};

// dbControllers.getUsers = (req, res, next) => {
//   const text = 'SELECT * FROM "public"."users"';
//   db.query(text)
//     .then((response) => {
//       res.locals.data = response;
//       return next();
//     })
//     .catch((err) => {
//       next({
//         log: 'Express Error Handler caught getUsers error',
//         status: 500,
//         message: {
//           err: 'dbControllerTest.getUsers encountered an error',
//         },
//       });
//     });
// };

// dbControllers.addUser = (req, res, next) => {
//   const text =
//     'INSERT INTO "public"."users" (full_name, user_name, email, password_) VALUES ($1, $2, $3, $4)';
//   const { full_name, user_name, email } = req.body[0];
//   const { password_ } = res.locals;

//   db.query(text, [full_name, user_name, email, password_], (err, result) => {
//     if (err) {
//       console.log('Error at dbControllers.addUser: ', err);
//       return res.status(500).send('Error Executing Insert Query');
//     }
//     console.log('Add User Query Executed Successfully', result);
//     next();
//   });
// };

// dbControllers.deleteUser = (req, res, next) => {
//   const text = 'DELETE FROM "public"."users" WHERE user_name = $1';
//   const { user_name } = req.body[0];

//   db.query(text, [user_name], (err, result) => {
//     if (err) {
//       console.log('Error at dbControllers.deleteUser: ', err);
//       return res.status(500).send('Error Executing Delete Query');
//     }
//     if (result.rowCount === 0) {
//       console.log('User Not Found');
//       return res.status(404).send('User Not Found');
//     }
//     console.log('Delete User Query Executed Successfully', result);
//     next();
//   });
// };
// //
// //Under Construction -Ted
// //
// // dbControllers.editUser = (req, res, next) => {
// //   const text =
// //     'UPDATE "public"."users" SET full_name = $1, user_name = $2, email = $3 WHERE _id = $4';
// //   const { full_name, user_name, email, _id } = req.body[0];

// //   db.query(text, [full_name, user_name, email, _id], (err, result) => {
// //     if (err) {
// //       console.log(`Error Updating User: ${user_name}`, err);
// //       return res.status(500).send(`Error Updating User: ${user_name}`);
// //     }
// //     console.log(`${user_name} updated Successfully`);
// //     next();
// //   });
// // };
// dbControllers.editUser = (req, res, next) => {
//   const text =
//     'UPDATE "public"."users" SET full_name = $1, user_name = $2, email = $3 WHERE _id = $4';
//   const { full_name, user_name, email, _id } = req.body[0];

//   db.query(text, [full_name, user_name, email, _id], (err, result) => {
//     if (err) {
//       console.log(`Error Updating User: ${user_name}`, err);
//       return res.status(500).send(`Error Updating User: ${user_name}`);
//     }
//     console.log(`${user_name} updated Successfully`);
//     next();
//   });
// };

// module.exports = dbControllers;

const db = require('../models/dbPool');
const validator = require('validator');

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
  const { full_name, user_name, email } = req.body[0];
  const { password_ } = res.locals;

  db.query(text, [full_name, user_name, email, password_], (err, result) => {
    if (err) {
      console.log('Error at dbControllers.addUser: ', err);
      return res.status(500).send('Error Executing Insert Query');
    }
    console.log('Add User Query Executed Successfully', result);
    next();
  });
};

dbControllers.deleteUser = (req, res, next) => {
  const text = 'DELETE FROM "public"."users" WHERE user_name = $1';
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
  const { full_name, user_name, email, _id } = req.body[0];
  if (!validator.isLength(full_name, { min: 1, max: 255 })) {
    return res.status(400).send('Full Name must be between 1-255 Characters');
  }
  if (!validator.isLength(user_name, { min: 1, max: 255 })) {
    return res.status(400).send('User Name must be between 1-255 Characters');
  }
  if (!validator.isEmail(email, { min: 1, max: 255 })) {
    return res.status(400).send('Invalid Email Address');
  }
  const text =
    'UPDATE "public"."users" SET full_name = $1, user_name = $2, email = $3 WHERE _id = $4';

  db.query(text, [full_name, user_name, email, _id], (err, result) => {
    if (err) {
      console.log(`Error Updating User: ${user_name}`, err);
      return res.status(500).send(`Error Updating User: ${user_name}`);
    }
    console.log(`${user_name} updated Successfully`);
    next();
  });
};

module.exports = dbControllers;
