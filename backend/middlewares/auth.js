const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { cookies } = req;

  if ((!authorization || !authorization.startsWith('Bearer ')) && (!cookies.jwt)) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  const token = cookies.jwt ? cookies.jwt : authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
