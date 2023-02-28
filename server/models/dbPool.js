const { Pool } = require('pg');
<<<<<<< Updated upstream
const dotenv = require('dotenv').config();
=======
// const dotenv = require('dotenv').config();
// const PG_URI = process.env.MONGO_URI;
>>>>>>> Stashed changes

const { PG_URI } = process.env;

//create a new pool using the connection string above that brings us to our database

const pool = new Pool({
  connectionString: PG_URI,
});

//Now we need to export an object that has a query method in it, that we'll name query
//this method will return the invocation of the pool.query() after logging the query
//***This will be required in our controllers to gain access tp pur database***
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed Query: ', text);
    return pool.query(text, params, callback);
  },
};
