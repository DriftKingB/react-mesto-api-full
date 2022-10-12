const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AuthError = require('../errors/AuthError');
const { urlRegEx } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: urlRegEx,
  },
  email: {
    type: String,
    unique: true,
    match: /^.+@.+\..+$/,
  },
  password: {
    type: String,
    select: false,
  },
});

userSchema.statics.findByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new AuthError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError('Неправильные почта или пароль'));
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
