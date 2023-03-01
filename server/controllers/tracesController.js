const { XRayClient, GetTraceSummariesCommand } = require("@aws-sdk/client-xray");
const tracesController = {};

tracesController.getTraces = (req, res, next) => {
  console.log("in tracescontroller getTraces");
  // Set the AWS Region and X-Ray client object
  const REGION = "us-east-1";
  const xrayClient = new XRayClient({ region: REGION, credentials: res.locals.credentials });

  // Set the parameters
  const params = {
    StartTime: new Date(Date.now() - 36000000), // Get traces from the last hour
    EndTime: new Date(),
    Sampling: true,
    SamplingStrategy: {
      Name: "PartialScan",
      Value: 100,
    },
    //need to put in lambda function name
    FilterExpression: 'service("cakerTwoFunction")',
  };

  // Create a helper function to get trace summaries
  async function getTraceSummaries() {
    try {
      // Retrieve trace summaries using the GetTraceSummariesCommand
      console.log("in traces try");
      const data = await xrayClient.send(new GetTraceSummariesCommand(params));

      // Log the trace summaries to the console
      console.log("data tracesummaries:", data.TraceSummaries);
      res.locals.traces = data.TraceSummaries;
      next();
    } catch (err) {
      console.log("Error", err);
    }
  }

  // Call the helper function
  getTraceSummaries();
};
module.exports = tracesController;

//type annotation
// [
//     {
//         "Annotations": {},
//         "AvailabilityZones": [],
//         "Duration": 0.374,
//         "EntryPoint": {
//             "Name": "cakerFirstFunction",
//             "Names": [
//                 "cakerFirstFunction"
//             ],
//             "Type": "AWS::Lambda"
//         },
//         "ErrorRootCauses": [],
//         "FaultRootCauses": [],
//         "HasError": false,
//         "HasFault": false,
//         "HasThrottle": false,
//         "Http": {
//             "HttpStatus": 200
//         },
//         "Id": "1-63fe264e-27c98b2b78dadb031acbfdb9",
//         "InstanceIds": [],
//         "IsPartial": false,
//         "ResourceARNs": [
//             {
//                 "ARN": "arn:aws:lambda:us-east-1:498545057811:function:cakerFirstFunction"
//             }
//         ],
//         "ResponseTime": 0.365,
//         "ResponseTimeRootCauses": [],
//         "Revision": 1,
//         "ServiceIds": [
//             {
//                 "AccountId": "498545057811",
//                 "Name": "cakerFirstFunction",
//                 "Names": [
//                     "cakerFirstFunction"
//                 ],
//                 "Type": "AWS::Lambda::Function"
//             },
//             {
//                 "Name": "cakerFirstFunction",
//                 "Names": [
//                     "cakerFirstFunction"
//                 ],
//                 "Type": "client"
//             },
//             {
//                 "Name": "cakerFirstFunction",
//                 "Names": [
//                     "cakerFirstFunction"
//                 ],
//                 "Type": "AWS::Lambda"
//             }
//         ],
//         "Users": []
//     }
// ]
// [
// {
//     "Annotations": {},
//     "AvailabilityZones": [],
//     "Duration": 2.938,
//     "EntryPoint": {
//         "Name": "cakerTwoFunction",
//         "Names": [
//             "cakerTwoFunction"
//         ],
//         "Type": "AWS::Lambda"
//     },
//     "ErrorRootCauses": [],
//     "FaultRootCauses": [],
//     "HasError": true,
//     "HasFault": false,
//     "HasThrottle": false,
//     "Http": {
//         "HttpStatus": 200
//     },
//     "Id": "1-63fe57a6-6ff5f1ba6779b8d754b15282",
//     "InstanceIds": [],
//     "IsPartial": false,
//     "ResourceARNs": [
//         {
//             "ARN": "arn:aws:lambda:us-east-1:498545057811:function:cakerTwoFunction"
//         }
//     ],
//     "ResponseTime": 2.839,
//     "ResponseTimeRootCauses": [
//         {
//             "ClientImpacting": true,
//             "Services": [
//                 {
//                     "EntityPath": [
//                         {
//                             "Coverage": 1,
//                             "Name": "cakerTwoFunction",
//                             "Remote": false
//                         }
//                     ],
//                     "Inferred": false,
//                     "Name": "cakerTwoFunction",
//                     "Names": [
//                         "cakerTwoFunction"
//                     ],
//                     "Type": "AWS::Lambda"
//                 },
//                 {
//                     "AccountId": "498545057811",
//                     "EntityPath": [
//                         {
//                             "Coverage": 0.896,
//                             "Name": "cakerTwoFunction",
//                             "Remote": false
//                         },
//                         {
//                             "Coverage": 0.896,
//                             "Name": "Initialization",
//                             "Remote": false
//                         }
//                     ],
//                     "Inferred": false,
//                     "Name": "cakerTwoFunction",
//                     "Names": [
//                         "cakerTwoFunction"
//                     ],
//                     "Type": "AWS::Lambda::Function"
//                 }
//             ]
//         }
//     ],
//     "Revision": 1,
//     "ServiceIds": [
//         {
//             "Name": "cakerTwoFunction",
//             "Names": [
//                 "cakerTwoFunction"
//             ],
//             "Type": "AWS::Lambda"
//         },
//         {
//             "Name": "cakerTwoFunction",
//             "Names": [
//                 "cakerTwoFunction"
//             ],
//             "Type": "client"
//         },
//         {
//             "AccountId": "498545057811",
//             "Name": "cakerTwoFunction",
//             "Names": [
//                 "cakerTwoFunction"
//             ],
//             "Type": "AWS::Lambda::Function"
//         }
//     ],
//     "Users": []
// }
// ]
