const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();

const apiRouter = require('./routes/api');

const PORT = 3000;

/**
 * Automatically parse urlencoded body content and form data from incoming requests and place it
 * in req.body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);//Handle requests for Static Files here
//--------------**Not working how I expected**-Ted
app.use(express.static(path.resolve(__dirname, '../src')));
//Define Route handlers Here
//---------------
app.use('/api', apiRouter);

// app.get('/', apiRouter);

// app.post('/');

//Catch All Route Handler for any requests to an unkown route
//----------------
app.use((req, res) => res.status(404).send('This page cannot be found...'));

//Default Express Error Handler here
//____________
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//Start Server
//__________

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
