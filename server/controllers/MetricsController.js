const Redis = require('redis');
// const getOrSetCache = require('../redis');
const redisClient = Redis.createClient();
(async () => {
  await redisClient.connect().catch((err) => {
    console.log('Redis Connect Error: ' + err.message);
  });
})();

const {
  CloudWatch,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

//declare an rdsMetricsController object
const rdsMetricsController = {};

//getRDSCPUUtilizationMetrics function, which will be called by the getRDSCPUUtilizationMetrics route handler
rdsMetricsController.getMetrics = async (req, res, next) => {
  console.log('in metrics');

  redisClient
    .get('LambdaMetrics')
    .then((data) => JSON.parse(data))
    .then((data) => {
      console.log(data);
      if (data !== null) {
        res.locals.getLambdaMetrics = data;
        return next();
      } else {
        console.log('cache miss');
        const fullfunc = async () => {
          //declare a constant variable called cloudwatch, which will be used to call the AWS CloudWatch API
          const cloudwatch = new CloudWatch({
            region: 'us-east-1',
            credentials: res.locals.credentials,
          });

          //declare a constant variable called params, which will be used to pass the parameters of the RDSCpuUtilization metrics to the AWS CloudWatch API
          const params = {
            MetricDataQueries: [],
            StartTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // one hour ago
            EndTime: new Date(), // now
            ScanBy: 'TimestampDescending', // the order to return data, newest first
          };

          //try to call the AWS CloudWatch API to get the RDSCpuUtilization metrics
          for (const Lambda in res.locals.lambdaNames) {
            console.log('lambdaName ' + Lambda);
            params.MetricDataQueries.push({
              Id: `invocations${Lambda}`,
              MetricStat: {
                Metric: {
                  Namespace: 'AWS/Lambda',
                  MetricName: 'Invocations',
                  Dimensions: [
                    {
                      Name: 'FunctionName',
                      Value: res.locals.lambdaNames[Lambda],
                    },
                  ],
                },
                Period: 300, // the granularity of the data, in seconds
                Stat: 'Sum', // the statistic to retrieve for this metric
              },
              ReturnData: true, // whether to return the data for this query
            });
            params.MetricDataQueries.push({
              Id: `errors${Lambda}`,
              MetricStat: {
                Metric: {
                  Namespace: 'AWS/Lambda',
                  MetricName: 'Errors',
                  Dimensions: [
                    {
                      Name: 'FunctionName',
                      Value: res.locals.lambdaNames[Lambda],
                    },
                  ],
                },
                Period: 300, // the granularity of the data, in seconds
                Stat: 'Sum', // the statistic to retrieve for this metric
              },
              ReturnData: true, // whether to return the data for this query
            });
          }
          try {
            console.log('in try');
            // const data = await cloudwatch.getMetricData(params);
            const data = await cloudwatch.send(
              new GetMetricDataCommand(params)
            );
            console.log('full montey');
            res.locals.getLambdaMetrics = data;
            await redisClient.set(
              'LambdaMetrics',
              JSON.stringify(data),
              'EX',
              60 * 60
            );
            return next();
            //if there is an error, log the error and throw the error
          } catch (error) {
            console.error(error);
            throw error;
          }
        };
        fullfunc();
      }
    });
};

module.exports = rdsMetricsController;
