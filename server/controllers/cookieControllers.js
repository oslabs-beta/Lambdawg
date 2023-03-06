require('dotenv').config();
const jwt = require('jsonwebtoken');

const cookieControllers = {};

cookieControllers.setCookie = (req, res, next) => {
  const { user_name } = req.params;

  const accessToken = jwt.sign(user_name, process.env.ACCESS_SECRET_TOKEN);

  //sends the token as a cookie
  // , secure: true  // If I want to make it via https only add this in the object below
  res.cookie('jwt', accessToken, { httpOnly: true });

  return next();
};

cookieControllers.authenticateCookie = (req, res, next) => {
  //assigns the jwt string to authHeader
  const authHeader = req.headers.cookie;

  //this is checking to see if we have a cookie, and if we do, assign the sliced
  //cookie to token (We're slicing it to remove the key name, in our case 'jwt=')
  const token = authHeader && authHeader.slice(4);

  //checks if token doesnt exist
  //if it does, verifies if its legit
  //if not legit sends back an error
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Get outta Here! You are not AUTHORIZED' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Get outta Here! You are not AUTHORIZED' });
  }
};

module.exports = cookieControllers;
