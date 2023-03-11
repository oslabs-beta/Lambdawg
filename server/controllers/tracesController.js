const { XRayClient, GetTraceSummariesCommand } = require("@aws-sdk/client-xray");
const tracesController = {};

tracesController.getTraces = async (req, res, next) => {
  console.log("in tracescontroller getTraces");
  const { lambdaNames } = res.locals;

  console.log(lambdaNames);
  // Set the AWS Region and X-Ray client object
  const REGION = "us-east-1";
  const xrayClient = new XRayClient({ region: REGION, credentials: res.locals.credentials });
  const dataPromise = [];
  const dataArray = [];
  lambdaNames.forEach((lambda) => {
    const name = `service("${lambda}")`;
    const params = {
      StartTime: new Date(Date.now() - 1000 * 60 * 60 * 10), //past 10 hours
      EndTime: new Date(),
      Sampling: false,
      FilterExpression: name,
      // NextToken: nextToken,
    };
    try {
      dataPromise.push(
        xrayClient.send(new GetTraceSummariesCommand(params)).then((data) => {
          dataArray.push({
            name: lambda,
            summary: data.TraceSummaries,
          });
        })
      );
    } catch (err) {
      console.error(err);
    }
  });
  await Promise.all(dataPromise);

  res.locals.traces = dataArray;
  console.log("dataArray", dataArray);
  next();
};
module.exports = tracesController;
