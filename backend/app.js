const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const login = require('./routes/signin');
const signup = require('./routes/signup');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsChecker } = require('./middlewares/corsChecker');
const NotFoundError = require('./errors/NotFoundError');
const { customErrorHandler } = require('./middlewares/errorHandlers');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, console.log(`Server listening on port: ${PORT}`));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(corsChecker);

app.use('/signin', login);
app.use('/signup', signup);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.all('*', (req, res, next) => {
  next(new NotFoundError('Указан некорректный путь'));
});

app.use(errorLogger);

app.use(errors());
app.use(customErrorHandler);
