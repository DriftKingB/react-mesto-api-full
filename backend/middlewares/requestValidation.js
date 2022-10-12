const { celebrate, Joi } = require('celebrate');
const { urlRegEx } = require('../utils/constants');

const validationConfig = {
  abortEarly: false,
  errors: { wrap: { label: false } },
  messages: {
    'any.required': '{#label}: поле - обязательно',
    'string.empty': '{#label}: поле не может быть пустым',
    'string.pattern.base': '{#label}: некорректный формат',
    'string.min': '{#label}: поле слишком короткое (минимум - {#limit} символа)',
    'string.max': '{#label}: поле слишком длинное (максимум - {#limit} символов)',
    'string.email': '{#label}: некорректный формат почты',
  },
};

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegEx),
  }),
}, validationConfig);

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30)
      .default('Исследователь'),
    avatar: Joi.string().pattern(urlRegEx)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}, validationConfig);

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegEx),
  }),
}, validationConfig);

const validateCardParams = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}, {
  messages: { '*': 'Указан некорректный id' },
});

const validateUserParams = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
}, {
  messages: { '*': 'Указан некорректный id' },
});

module.exports = {
  validateCard,
  validateUser,
  validateUserInfo,
  validateCardParams,
  validateUserParams,
};
