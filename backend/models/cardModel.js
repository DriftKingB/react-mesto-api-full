const mongoose = require('mongoose');
const NotFoundError = require('../errors/NotFoundError');
const PermissionError = require('../errors/PermissionError');
const { urlRegEx } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    match: urlRegEx,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.statics.checkUserRights = function (cardId, userId) {
  return this.findOne({ _id: cardId })
    .orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      if (card.owner.equals(userId)) {
        return Promise.resolve(card);
      }

      return Promise.reject(new PermissionError('У вас нет прав на редактирование этой карточки'));
    });
};

module.exports = mongoose.model('card', cardSchema);
