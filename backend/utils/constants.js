const urlRegEx = /^https?:\/\/[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

const allowedCors = [
  'localhost:3000',
  'https://domesto.students.nomoredomains.icu',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { urlRegEx, allowedCors, DEFAULT_ALLOWED_METHODS };
