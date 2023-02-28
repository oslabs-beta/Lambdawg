// const db = require('../models/dbPool');

// const dbControllersTest = {};

// dbControllersTest.getUsers = (req, res, next) => {
//   const text = 'SELECT * FROM "public"."users" LIMIT 10';
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
// // dbControllersTest.addUser = (req, res, next) => {
// //     const text =
// // }
// module.exports = dbControllersTest;
