const express = require('express');
const path = require('path');

// const userController = require('./controllers/userController');
// const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');

const PORT = 3000;

const app = express();

app.use('/', (req, res) => {
  console.log('it works');
});

// const mongoURI =
//   process.env.NODE_ENV === 'test'
//     ? 'mongodb://localhost/unit11test'
//     : 'mongodb://localhost/unit11dev';
// mongoose.connect(mongoURI);

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 * in req.body
 */
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
