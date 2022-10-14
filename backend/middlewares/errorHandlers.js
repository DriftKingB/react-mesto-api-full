const { isCelebrateError } = require('celebrate');

function celebrateErrorHandler(err, req, res, next) {
  if (isCelebrateError(err)) {
    const errObject = Object.fromEntries(err.details.entries());
    const errMessage = Object.values(errObject)[0].details.map((error) => error.message).join('; ');

    res.status(400).send({ message: errMessage });
    return;
  }

  next(err);
}

// eslint-disable-next-line no-unused-vars
function customErrorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'Ошибка сервера' : message });
}

module.exports = {
  celebrateErrorHandler,
  customErrorHandler,
};
