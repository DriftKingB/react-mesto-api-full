const Card = require('../models/cardModel');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

function createCard(req, res, next) {
  const owner = req.user;
  const {
    name, link, likes, createdAt,
  } = req.body;

  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации mongoose'));
        return;
      }
      next(err);
    });
}

function removeCard(req, res, next) {
  const { user, params } = req;
  Card.checkUserRights(params.cardId, user._id)
    .then(({ _id }) => {
      Card.findByIdAndDelete(_id)
        .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
        .then((card) => {
          res.send({ data: card });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указан некорректный id'));
        return;
      }
      next(err);
    });
}

function putCardLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указан некорректный id'));
        return;
      }
      next(err);
    });
}

function removeCardLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Указан некорректный id'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getCards,
  createCard,
  removeCard,
  putCardLike,
  removeCardLike,
};
