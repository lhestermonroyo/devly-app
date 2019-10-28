require('dotenv').config();
const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');

const HttpError = require('../responses/HttpError');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if(!token) {
    return res.status(401).json(new HttpError(new Date, 401, 9998, 'Invalid token, permission denied.'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    req.user = decoded.user;
    next();
  } catch(err) {
    console.log(err);
    return res.status(500).json(new HttpError(new Date, 500, 9999, `Error: ${err}`));
  }
}