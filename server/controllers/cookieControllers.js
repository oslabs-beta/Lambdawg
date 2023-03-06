require('dotenv').config();
const jwt = require('jsonwebtoken');

const cookieControllers = {};

cookieControllers.setCookie = (req, res, next) => {
  const { user_name } = req.params;
  console.log('USERNAME ', user_name);
  console.log(
    'WHERE AM I ??????????????????????????????????????????????????????????'
  );
  // const user = { user_name: user_name }; //why did i use an objecxt here?
  const user = user_name;
  console.log('cookieController username from params ', user_name);

  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN);
  console.log('Cookie Value-> ', accessToken);
  //sends the token as a cookie
  // , secure: true
  res.cookie('jwt', accessToken, { httpOnly: true });
  // res.cookie('cookie', 'cookie');
  // console.log('res.headers -> ', res.getHeaders());
  // res.json();

  // res.locals.json(); //sends the JWT back to the front end in an object
  return next();
};

cookieControllers.authenticateCookie = (req, res, next) => {
  //assigns the jwt string to authHeader
  const authHeader = req.headers.cookie;
  //this is checking to see if we have a cookie, and if we do, assign the sliced
  //cookie to token (We're slicing it to remove the key name)
  const token = authHeader && authHeader.slice(4);

  //checks if token doesnt exist
  //if it does, verifies if its legit
  //if not legoit sends back an error
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Get outta Here! You are not athorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    req.params.user_name = decoded;
    console.log('decoded ', decoded);
    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Get outta Here! You are not athorized' });
  }
};

module.exports = cookieControllers;
