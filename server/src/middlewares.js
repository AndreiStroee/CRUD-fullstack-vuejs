/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('./model/User');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

function unAuthorized(res, next) {
  const error = new Error('UN-AUTHORIZED');
  res.status(401);
  next(error);
}

function verifyToken(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json('Access Denied!');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    unAuthorized(res, next);
  }
}

function isAdmin(req, res, next) {
  const user = User.findOne({ role: 'admin' });
  if (user) {
    next();
  } else {
    unAuthorized(res, next);
  }
}

module.exports = {
  notFound,
  errorHandler,
  verifyToken,
  isAdmin,
};
