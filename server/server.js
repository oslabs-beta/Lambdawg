const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const credentialController = require('./controllers/credentialController');
const listLambdasController = require('./controllers/listLambdasController');
const MetricsController = require('./controllers/MetricsController.js');
const lambdaLogsController = require('./controllers/lambdaLogsController');
const tracesController = require('./controllers/tracesController.js');
const jwt = require('jsonwebtoken');

const app = express();

const apiRouter = require('./routes/api');

const PORT = process.env.PORT || 3000;

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 * in req.body
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());

//Handle requests for Static Files here
//--------------**Not working how I expected**-Ted
app.use(express.static(path.resolve(__dirname, '../src')));
//Define Route handlers Here
//---------------
app.use('/api', apiRouter);

// app.get('/', apiRouter);

// app.post('/');

app.post(
  '/getLambdaNames',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  // lambdaLogsController.getLambdaLogs,
  // rdsMetricsController.getRDSCPUUtilizationMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.lambdaNames);
  }
);

//Return a JSON object containing all lambda function traces.
//The route first requests fresh credentials from the user's AWS accounts. Then collects lambda function names and uses them to request AWS XRAY trace data for all functions
// Redis implemented
app.post(
  '/getTraces',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  tracesController.getTraces,
  (req, res) => {
    return res.status(200).json(res.locals.traces);
  }
);

//Return a JSON object containing all lambda function traces.
//The route first requests fresh credentials from the user's AWS accounts. Then collects lambda function names and uses them to request AWS Cloudwatch log data for all functions
// Redis implemented
app.post(
  '/getLambdaLogs',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  lambdaLogsController.getLambdaLogs,
  (req, res) => {
    return res.status(200).json(res.locals.functionLogs);
  }
);

//Return a JSON object containing all lambda function traces.
//The route first requests fresh credentials from the user's AWS accounts. Then collects lambda function names and uses them to request AWS Cloudwatch Metrics data for all functions
// Redis implemented
app.post(
  '/getLambdaMetrics',
  credentialController.getCredentials,
  listLambdasController.getLambdas,
  MetricsController.getMetrics,
  (req, res) => {
    return res.status(200).json(res.locals.getLambdaMetrics);
  }
);

// Delete values of this user's redis keys/value pairs
app.delete('/deleteRedis', credentialController.deleteRedis);

//Catch All Route Handler for any requests to an unkown route
//----------------
app.use((req, res) => res.status(404).send('This page cannot be found...'));

//Default Express Error Handler here
//____________
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
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
