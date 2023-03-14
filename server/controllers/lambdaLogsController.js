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
  CloudWatchLogsClient,
  FilterLogEventsCommand,
} = require('@aws-sdk/client-cloudwatch-logs');

//retrieve logs of each lambda function
const getLambdaLogs = async (req, res, next) => {
  //check if the user's log data is present in redis before making the api calls.
  // redisClient
  //   .get('LambdaLogs' + req.body.arn)
  //   .then((data) => JSON.parse(data))
  //   .then((data) => {
  //     if (data !== null) {
  //       res.locals.functionLogs = data;
  //       return next();
  //     } else {
  //       console.log('cache miss');
  //executes call if no valid redis data is found
  const fullfunc = async () => {
    res.locals.functionLogs = [];
    console.log(res.locals.lambdaNames);
    for (let Lambda of res.locals.lambdaNames) {
      console.log('in lambda ' + Lambda);
      const currFunc = Lambda;
      const logGroupName = '/aws/lambda/' + currFunc;

      //create new instance of CloudWatchLogsClient with user's region and credentials
      const cloudWatchLogs = new CloudWatchLogsClient({
        region: 'us-east-1',
        credentials: res.locals.credentials,
      });

      //initiate starttime to be 7 days before endtime in milliseconds from epoch time
      const now = new Date();
      const EndTime = now.valueOf();
      const StartTime = new Date(
        now.getTime() - 7 * 24 * 60 * 60 * 1000
      ).valueOf();

      //helper function to recursively retrieve logs if there's a nextToken
      const nextTokenHelper = async (nextToken, data = []) => {
        if (!nextToken) {
          return data;
        }
        const nextLogEvents = await cloudWatchLogs.send(
          new FilterLogEventsCommand({
            logGroupName,
            endTime: EndTime.valueOf(),
            startTime: StartTime.valueOf(),
            nextToken,
            filterPattern: '- START - END ',
          })
        );
        data.push(nextLogEvents.events);
        return nextTokenHelper(nextLogEvents.nextToken, data);
      };

      //AWS query format for each individual lambda function to list logs
      try {
        const logEvents = await cloudWatchLogs.send(
          new FilterLogEventsCommand({
            logGroupName,
            endTime: EndTime.valueOf(),
            startTime: StartTime.valueOf(),
            filterPattern: '- START - END ',
          })
        );

        // const Redis = require('redis');
        // const getOrSetCache = require('../redis');
        // const redisClient = Redis.createClient();
        // (async () => {
        //   await redisClient.connect().catch((err) => {
        //     console.log('Redis Connect Error: ' + err.message);
        //   });
        // })();
        // console.log('LogEvents ' + JSON.stringify(logEvents));
        //if there are no logs, return to next middleware
        if (!logEvents) {
          return next();
        }

        //if there is a nextToken, recursively retrieve logs with helper function
        if (logEvents.nextToken) {
          const nextTokenData = await nextTokenHelper(logEvents.nextToken);
          logEvents.events = logEvents.events.concat(...nextTokenData);
        }

        //only return the first 50 logs
        const fiftyLogEvents = logEvents.events.slice(0, 50);

        //format the logs to remove unnecessary information
        const logEventsMessages = [];
        fiftyLogEvents.forEach((event) => {
          if (
            event.message.slice(0, 4) !== 'LOGS' &&
            event.message.slice(0, 9) !== 'EXTENSION'
          ) {
            logEventsMessages.push({
              message: event.message.slice(67),
              timestamp: new Date(event.timestamp),
            });
          } else {
            logEventsMessages.push({
              message: event.message,
              timeStamp: new Date(event.timestamp),
            });
          }
        });
        // console.log('logeventmessages ' + logEventsMessages);
        res.locals.functionLogs.push({
          FunctionName: Lambda,
          logs: logEventsMessages,
        });
        // await redisClient.set(
        //   'LambdaLogs' + req.body.arn,
        //   JSON.stringify(res.locals.functionLogs),
        //   'EX',
        //   60 * 60
        // );
      } catch (err) {
        if (err) console.error(err);
        console.log('there was an error in the loop : ' + err);
        //return next(err);
      }
    }
    return next();
  };
  fullfunc();
};
// });
// };

module.exports = {
  getLambdaLogs,
};
