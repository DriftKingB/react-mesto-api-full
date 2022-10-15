require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { authorization } = req.headers;
  const { cookies } = req;

  if ((!authorization || !authorization.startsWith('Bearer ')) && (!cookies.jwt)) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  const token = cookies.jwt ? cookies.jwt : authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
