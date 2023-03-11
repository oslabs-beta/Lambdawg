require('dotenv').config();
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

const cookieControllers = {};

cookieControllers.setCookie = (req, res, next) => {
  const { user_name } = req.params;

  const accessToken = jwt.sign(user_name, process.env.ACCESS_SECRET_TOKEN);

  //sends the token as a cookie
  // , secure: true  // If I want to make it via https only add this in the object below
  // res.cookie('jwt', accessToken);
  res.cookie('jwt', accessToken, {
    httpOnly: true,
    sameSite: 'none',
  });
  return next();
};

cookieControllers.authenticateCookie = (req, res, next) => {
  console.log('inside cookie controller', JSON.stringify(req.cookie));

  //assigns the jwt string to authHeader
  const authHeader = req.cookies.jwt;
  // console.log('authheader ', authHeader);
  //this is checking to see if we have a cookie, and if we do, assign the cookie to token
  const token = authHeader && authHeader;

  //checks if token doesn't exist
  //if it does, verifies if its legit
  //if not legit sends back an error
  if (!token) {
    return res.status(401).json({ message: 'No Cookie' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    res.locals.user_name = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'No Cookie' });
  }
};

cookieControllers.deleteCookie = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Issue Deleting Cookie' });
  }
};

module.exports = cookieControllers;
