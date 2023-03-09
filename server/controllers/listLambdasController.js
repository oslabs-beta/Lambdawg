const Redis = require('redis');
// const getOrSetCache = require('../redis');
const redisClient = Redis.createClient();
(async () => {
  await redisClient.connect().catch((err) => {
    console.log('Redis Connect Error: ' + err.message);
  });
})();
const {
  LambdaClient,
  ListFunctionsCommand,
} = require('@aws-sdk/client-lambda');
const { get } = require('../routes/api');
const { json } = require('stream/consumers');

const listLambdasController = {};

//retrieve name of all user's lambda functions
listLambdasController.getLambdas = (req, res, next) => {
  //create new instance of LambdaClient with user's region and credentials
  // console.log('in getlambs');
  redisClient
    .get('LambdaList')
    .then((data) => json(data))
    .then((data) => (res.locals.lambdaNames = data))
    .then((lambdaNames) => {
      console.log(res.locals.lambdaNames);
    })
    .then((data) => next())
    .catch((err) => {
      console.log('cache miss');
      const fullfunc = async () => {
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

          const funcList = allFuncs.Functions.map((func) => func.FunctionName);
          await redisClient.set(
            'LambdaList',
            JSON.stringify(funcList),
            'EX',
            60 * 60
          );
          console.log('full montey');
          res.locals.lambdaNames = funcList;

          return next();
        } catch (err) {
          console.log('Error in listLambdas', err);
          return next(err);
        }
      };
      fullfunc();
    });
};

module.exports = listLambdasController;
