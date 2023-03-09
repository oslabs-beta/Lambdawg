// const Redis = require('redis'); //for prod: Redis.createClient({url : xxxx})
// const redisClient = Redis.createClient();
// (async () => {
//   await redisClient.connect().catch((err) => {
//     console.log('Redis Connect Error: ' + err.message);
//   });
// })();
// // const DEFAULT_EXPIRATION_REDIS = 3600;
// // incontroller = () => {
// //   //check if Redis Data present before making an API call
// //   redisClient.get('metrics', (error, metrics) => {
// //     if (error) console.error(error);
// //     if (metrics) {
// //       res.locals.xxxxx = JSON.parse(metrics);
// //     } else {
// //       //API CALL HERE
// //     }
// //   });
// //   //save data after call
// //   redisClient.setex('metrics', DEFAULT_EXPIRATION_REDIS, JSON.stringify(data)); //replace data by the returned value of the API call
// // };

// async function getOrSetCache(key, expiration, cb) {
//   console.log('in redis client');
//   return new Promise((resolve, reject) => {
//     redisClient.get(key, async (error, data) => {
//       if (error) {
//         console.log('error');
//         return reject(error);
//       }
//       if (data) {
//         console.log('loading2');
//         return resolve(JSON.parse(data));
//       }
//       console.log('loading');
//       const freshData = await cb();
//       redisClient.set(key, JSON.stringify(freshData), EX, expiration);
//       resolve(freshData);
//     });
//   });
// }

// // incotroller2 = async () => {
// //   const metrics = await getOrSetCache('querystring', async () => {
// //     //put API CALL HERE
// //   });
// // };

// module.exports = getOrSetCache;
