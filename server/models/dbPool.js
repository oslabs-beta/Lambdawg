const { Pool } = require('pg');

const PG_URI =
  //   'postgres://fzlocmxc:cSVvrq52FYy9AXvuGc2r6lwqoFnzEH82@trumpet.db.elephantsql.com/fzlocmxc';
  'postgres://fzlocmxc:cSVvrq52FYy9AXvuGc2r6lwqoFnzEH82@trumpet.db.elephantsql.com/fzlocmxc';

//create a new pool using the connection string above that brings us to our database

const pool = new Pool({
  connectionString: PG_URI,
});

//Wouldn't you love to know what our databse looks like?
//Well, ass soon as i start to poulate it, I will leave details here as to what the structure looks like

//Now we need to export an object that has a query method in it, that we'll name query
//this method will return the invocation of the pool.query() after logging the query
//***This will be required in our controllers to gain access tp pur database***
module.exports = {
  query: (text, params, callback) => {
    console.log('Executed Query: ', text);
    return pool.query(text, params, callback);
  },
};
