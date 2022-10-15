require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

function handleLogin(req, res, next) {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
          sameSite: 'none',
          secure: true,
        })
        .send({ data: token });
    })
    .catch(next);
}

module.exports = { handleLogin };
