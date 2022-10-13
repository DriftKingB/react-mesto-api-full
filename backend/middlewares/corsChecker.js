const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

function corsChecker(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Method', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }

  next();
}

module.exports = corsChecker;
