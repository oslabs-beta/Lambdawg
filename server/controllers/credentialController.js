const Redis = require('redis');
// Open a new redis client to send requests to the redis server.
const redisClient = Redis.createClient();
// Check if the connection is open befors proceeding.
(async () => {
  await redisClient.connect().catch((err) => {
    console.log('Redis Connect Error: ' + err.message);
  });
})();

// Use AWS SDK for javascript v3 to import session Token.
const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
const { triggerAsyncId } = require('async_hooks');
const dotenv = require('dotenv').config();
const { _KEY, _SKEY, USER_ARN } = process.env;

const credentialController = {};
//declare a constant variable called credentials, which will be used to call the AWS STS API, passing in the access key id and secret access key of the cloudband account
const credentials = {
  accessKeyId: _KEY,
  secretAccessKey: _SKEY,
};

//get user's access key id and secret access key from AWS
credentialController.getCredentials = async (req, res, next) => {
  // console.log('credential controller arn', req.body.arn);
  const { arn } = req.body;
  // const arn = USER_ARN;
  const region = 'us-east-1';
  const info = {
    RoleArn: arn,
    RoleSessionName: 'LambdawgRoleSession',
    DurationSeconds: 900,
    ExternalId: 'Lambdawg',
  };
  //create new STS client instance with cloudband's region and credentials
  const stsClient = new STSClient({ region: region, credentials: credentials });

  //send request to AWS to assume role in user's account to retrieve temporary credentials for read-only access
  try {
    const assumedRole = await stsClient.send(new AssumeRoleCommand(info));
    const accessKeyId = assumedRole.Credentials.AccessKeyId;
    const secretAccessKey = assumedRole.Credentials.SecretAccessKey;
    const sessionToken = assumedRole.Credentials.SessionToken;
    res.locals.credentials = { accessKeyId, secretAccessKey, sessionToken };
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//delete user-specific redis data
credentialController.deleteRedis = async (req, res, next) => {
  redisClient.del('LambdaTraces' + req.body.arn, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  redisClient.del('LambdaLogs' + req.body.arn, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  redisClient.del('LambdaList' + req.body.arn, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  redisClient.del('LambdaMetrics' + req.body.arn, (err, result) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  console.log('redis user data deleted !');
  return res.status(200).json('Redis user data deleted');
};

module.exports = credentialController;
