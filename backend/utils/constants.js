const urlRegEx = /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

const allowedCors = [
  'http://localhost:3000',
  'https://domesto.students.nomoredomains.icu',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true,
};

module.exports = {
  urlRegEx,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  corsConfig,
};
