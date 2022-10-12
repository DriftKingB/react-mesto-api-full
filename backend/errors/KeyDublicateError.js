class KeyDublicateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'KeyDublicateError';
    this.statusCode = 409;
  }
}

module.exports = KeyDublicateError;
