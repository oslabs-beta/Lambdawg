//declare an rdsMetricsController object
const rdsMetricsController = {};

//getRDSCPUUtilizationMetrics function, which will be called by the getRDSCPUUtilizationMetrics route handler
rdsMetricsController.getRDSCPUUtilizationMetrics = async (req, res, next) => {
  console.log('in metrics');
  const {
    CloudWatch,
    GetMetricDataCommand,
  } = require('@aws-sdk/client-cloudwatch');
  //declare a constant variable called cloudwatch, which will be used to call the AWS CloudWatch API
  const cloudwatch = new CloudWatch({
    region: 'us-east-1',
    credentials: res.locals.credentials,
  });

  //declare a constant variable called params, which will be used to pass the parameters of the RDSCpuUtilization metrics to the AWS CloudWatch API
  const params = {
    MetricDataQueries: [
      {
        Id: 'invocations',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Invocations',
            Dimensions: [{ Name: 'FunctionName', Value: 'cakerTwoFunction' }],
          },
          Period: 300, // the granularity of the data, in seconds
          Stat: 'Sum', // the statistic to retrieve for this metric
        },
        ReturnData: true, // whether to return the data for this query
      },
      {
        Id: 'errors',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: 'Errors',
            Dimensions: [{ Name: 'FunctionName', Value: 'cakerTwoFunction' }],
          },
          Period: 300, // the granularity of the data, in seconds
          Stat: 'Sum', // the statistic to retrieve for this metric
        },
        ReturnData: true, // whether to return the data for this query
      },
    ],
    StartTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // one hour ago
    EndTime: new Date(), // now
    ScanBy: 'TimestampDescending', // the order to return data, newest first
  };

  //try to call the AWS CloudWatch API to get the RDSCpuUtilization metrics
  try {
    console.log('in try');
    // const data = await cloudwatch.getMetricData(params);
    const data = await cloudwatch.send(new GetMetricDataCommand(params));
    res.locals.getRDSCPUUtilizationMetrics = data;
    return next();
    //if there is an error, log the error and throw the error
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = rdsMetricsController;
