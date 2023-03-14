// const Redis = require('redis');
// // Open a new redis client to send requests to the redis server.
// const redisClient = Redis.createClient();
// // Check if the connection is open before proceeding.
// (async () => {
//   await redisClient.connect().catch((err) => {
//     console.log('Redis Connect Error: ' + err.message);
//   });
// })();

// Use AWS SDK for javascript v3 to import cloudWatch logs.
const {
  LambdaClient,
  ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');
const { get } = require('../routes/api');
const { json } = require('stream/consumers');

const listLambdasController = {};

//retrieve name of all user's lambda functions
listLambdasController.getLambdas = (req, res, next) => {
  // redisClient
  //check if the user's function list is present in redis before making the api call
  // .get('LambdaList' + req.body.arn)
  // .then((data) => json(data))
  // .then((data) => (res.locals.lambdaNames = data))
  // .then((lambdaNames) => {
  //   console.log(res.locals.lambdaNames);
  // })
  // .then((data) => next())
  // .catch((err) => {
  // console.log('cache miss');
  //executes call if no valid redis data is found
  const fullfunc = async () => {
    //create new instance of LambdaClient with user's region and credentials
    const lambdaClient = new LambdaClient({
      region: 'us-east-1',
      credentials: res.locals.credentials,
    });

    //retrieve names of lambda functions (max 10)
    try {
      const allFuncs = await lambdaClient.send(
        new ListFunctionsCommand({
          MaxItems: 10,
          FunctionVersion: 'ALL',
        })
      );

      //create a list of all functions and save it to redis and res.locals
      const funcList = allFuncs.Functions.map((func) => func.FunctionName);
      // await redisClient.set(
      //   'LambdaList' + req.body.arn,
      //   JSON.stringify(funcList),
      //   'EX',
      //   60 * 60
      // );
      console.log('full montey');
      res.locals.lambdaNames = funcList;

      return next();
    } catch (err) {
      console.log('Error in listLambdas', err);
      return next(err);
    }
  };
  fullfunc();
  // });
};

module.exports = listLambdasController;
