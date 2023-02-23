const express = require('express');
const path = require('path');

const app = express();

const listLambdasController = require('./controllers/listLambdasController');
const credentialController = require('./controllers/credentialController');

const apiRouter = require('./routesTests/apiTest');

const PORT = 3000;

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 * in req.body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handle requests for Static Files here
//--------------
// app.use(express.static(path.resolve(__dirname, '../src/main')));
//Define Route handlers Here
//---------------
app.use('/apiTest', apiRouter);

app.get(
  '/getLambdaNames',
  credentialController.getCredentials,
  //listLambdasController.getLambdas,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaNames);
  }
);
//Catch All Route Handler for any requests to an unkown route
//----------------
app.use((req, res) => res.status(404).send('This page cannot be found...'));

//Add default Error Handler here
//____________
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//Start Server
//__________

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
