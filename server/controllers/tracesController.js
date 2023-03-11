const Redis = require('redis');
// const getOrSetCache = require('../redis');
const redisClient = Redis.createClient();
(async () => {
  await redisClient.connect().catch((err) => {
    console.log('Redis Connect Error: ' + err.message);
  });
})();

const {
  XRayClient,
  GetTraceSummariesCommand,
} = require('@aws-sdk/client-xray');
const tracesController = {};

tracesController.getTraces = async (req, res, next) => {
  console.log('in tracescontroller getTraces');

  redisClient
    .get('LambdaTraces')
    .then((data) => JSON.parse(data))
    .then((data) => {
      console.log(data);
      if (data !== null) {
        res.locals.traces = data;
        return next();
      } else {
        console.log('cache miss');
        const fullfunc = async () => {
          const { lambdaNames } = res.locals;

          console.log(lambdaNames);
          // Set the AWS Region and X-Ray client object
          const REGION = 'us-east-1';
          const xrayClient = new XRayClient({
            region: REGION,
            credentials: res.locals.credentials,
          });
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
                xrayClient
                  .send(new GetTraceSummariesCommand(params))
                  .then((data) => {
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
          console.log('full montey');
          await redisClient.set(
            'LambdaTraces',
            JSON.stringify(res.locals.traces),
            'EX',
            60 * 60
          );
          console.log('dataArray', dataArray);
          next();
        };
        fullfunc();
      }
    });
};

module.exports = tracesController;

// [
//   {
//       "data": "cakerFourFunction",
//       "summary": []
//   },
//   {
//       "data": "cakerThreeFunction",
//       "summary": [
//           {
//               "Annotations": {},
//               "AvailabilityZones": [],
//               "Duration": 2.953,
//               "EntryPoint": {
//                   "Name": "cakerThreeFunction",
//                   "Names": [
//                       "cakerThreeFunction"
//                   ],
//                   "Type": "AWS::Lambda"
//               },
//               "ErrorRootCauses": [],
//               "FaultRootCauses": [],
//               "HasError": true,
//               "HasFault": false,
//               "HasThrottle": false,
//               "Http": {
//                   "HttpStatus": 200
//               },
//               "Id": "1-6400239e-16e2293b0ab6db471dc99a05",
//               "InstanceIds": [],
//               "IsPartial": false,
//               "ResourceARNs": [
//                   {
//                       "ARN": "arn:aws:lambda:us-east-1:498545057811:function:cakerThreeFunction"
//                   }
//               ],
//               "ResponseTime": 2.894,
//               "ResponseTimeRootCauses": [
//                   {
//                       "ClientImpacting": true,
//                       "Services": [
//                           {
//                               "EntityPath": [
//                                   {
//                                       "Coverage": 1,
//                                       "Name": "cakerThreeFunction",
//                                       "Remote": false
//                                   }
//                               ],
//                               "Inferred": false,
//                               "Name": "cakerThreeFunction",
//                               "Names": [
//                                   "cakerThreeFunction"
//                               ],
//                               "Type": "AWS::Lambda"
//                           },
//                           {
//                               "AccountId": "498545057811",
//                               "EntityPath": [
//                                   {
//                                       "Coverage": 0.863,
//                                       "Name": "cakerThreeFunction",
//                                       "Remote": false
//                                   },
//                                   {
//                                       "Coverage": 0.863,
//                                       "Name": "Initialization",
//                                       "Remote": false
//                                   }
//                               ],
//                               "Inferred": false,
//                               "Name": "cakerThreeFunction",
//                               "Names": [
//                                   "cakerThreeFunction"
//                               ],
//                               "Type": "AWS::Lambda::Function"
//                           }
//                       ]
//                   }
//               ],
//               "Revision": 2,
//               "ServiceIds": [
//                   {
//                       "Name": "cakerThreeFunction",
//                       "Names": [
//                           "cakerThreeFunction"
//                       ],
//                       "Type": "client"
//                   },
//                   {
//                       "AccountId": "498545057811",
//                       "Name": "cakerThreeFunction",
//                       "Names": [
//                           "cakerThreeFunction"
//                       ],
//                       "Type": "AWS::Lambda::Function"
//                   },
//                   {
//                       "Name": "cakerThreeFunction",
//                       "Names": [
//                           "cakerThreeFunction"
//                       ],
//                       "Type": "AWS::Lambda"
//                   }
//               ],
//               "Users": []
//           }
//       ]
//   },
//   {
//       "data": "cakerTwoFunction",
//       "summary": [
//           {
//               "Annotations": {},
//               "AvailabilityZones": [],
//               "Duration": 1.311,
//               "EntryPoint": {
//                   "Name": "cakerTwoFunction",
//                   "Names": [
//                       "cakerTwoFunction"
//                   ],
//                   "Type": "AWS::Lambda"
//               },
//               "ErrorRootCauses": [],
//               "FaultRootCauses": [],
//               "HasError": false,
//               "HasFault": false,
//               "HasThrottle": false,
//               "Http": {
//                   "HttpStatus": 200
//               },
//               "Id": "1-64002391-4b513c45044a6e2c106f5824",
//               "InstanceIds": [],
//               "IsPartial": false,
//               "ResourceARNs": [
//                   {
//                       "ARN": "arn:aws:lambda:us-east-1:498545057811:function:cakerTwoFunction"
//                   }
//               ],
//               "ResponseTime": 1.157,
//               "ResponseTimeRootCauses": [],
//               "Revision": 1,
//               "ServiceIds": [
//                   {
//                       "Name": "cakerTwoFunction",
//                       "Names": [
//                           "cakerTwoFunction"
//                       ],
//                       "Type": "AWS::Lambda"
//                   },
//                   {
//                       "Name": "cakerTwoFunction",
//                       "Names": [
//                           "cakerTwoFunction"
//                       ],
//                       "Type": "client"
//                   },
//                   {
//                       "AccountId": "498545057811",
//                       "Name": "cakerTwoFunction",
//                       "Names": [
//                           "cakerTwoFunction"
//                       ],
//                       "Type": "AWS::Lambda::Function"
//                   }
//               ],
//               "Users": []
//           }
//       ]
//   },
//   {
//       "data": "cakerFirstFunction",
//       "summary": [
//           {
//               "Annotations": {},
//               "AvailabilityZones": [],
//               "Duration": 3.16,
//               "EntryPoint": {
//                   "Name": "cakerFirstFunction",
//                   "Names": [
//                       "cakerFirstFunction"
//                   ],
//                   "Type": "AWS::Lambda"
//               },
//               "ErrorRootCauses": [],
//               "FaultRootCauses": [],
//               "HasError": true,
//               "HasFault": false,
//               "HasThrottle": false,
//               "Http": {
//                   "HttpStatus": 200
//               },
//               "Id": "1-64002384-18920c8d458bcc5822d1529d",
//               "InstanceIds": [],
//               "IsPartial": false,
//               "ResourceARNs": [
//                   {
//                       "ARN": "arn:aws:lambda:us-east-1:498545057811:function:cakerFirstFunction"
//                   }
//               ],
//               "ResponseTime": 3.041,
//               "ResponseTimeRootCauses": [
//                   {
//                       "ClientImpacting": true,
//                       "Services": [
//                           {
//                               "EntityPath": [
//                                   {
//                                       "Coverage": 1,
//                                       "Name": "cakerFirstFunction",
//                                       "Remote": false
//                                   }
//                               ],
//                               "Inferred": false,
//                               "Name": "cakerFirstFunction",
//                               "Names": [
//                                   "cakerFirstFunction"
//                               ],
//                               "Type": "AWS::Lambda"
//                           },
//                           {
//                               "AccountId": "498545057811",
//                               "EntityPath": [
//                                   {
//                                       "Coverage": 0.865,
//                                       "Name": "cakerFirstFunction",
//                                       "Remote": false
//                                   },
//                                   {
//                                       "Coverage": 0.865,
//                                       "Name": "Initialization",
//                                       "Remote": false
//                                   }
//                               ],
//                               "Inferred": false,
//                               "Name": "cakerFirstFunction",
//                               "Names": [
//                                   "cakerFirstFunction"
//                               ],
//                               "Type": "AWS::Lambda::Function"
//                           }
//                       ]
//                   }
//               ],
//               "Revision": 2,
//               "ServiceIds": [
//                   {
//                       "AccountId": "498545057811",
//                       "Name": "cakerFirstFunction",
//                       "Names": [
//                           "cakerFirstFunction"
//                       ],
//                       "Type": "AWS::Lambda::Function"
//                   },
//                   {
//                       "Name": "cakerFirstFunction",
//                       "Names": [
//                           "cakerFirstFunction"
//                       ],
//                       "Type": "client"
//                   },
//                   {
//                       "Name": "cakerFirstFunction",
//                       "Names": [
//                           "cakerFirstFunction"
//                       ],
//                       "Type": "AWS::Lambda"
//                   }
//               ],
//               "Users": []
//           }
//       ]
//   }
// ]
