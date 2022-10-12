const router = require('express').Router();
const {
  getCards,
  createCard,
  removeCard,
  putCardLike,
  removeCardLike,
} = require('../controllers/cards');
const { validateCard, validateCardParams } = require('../middlewares/requestValidation');

router.get('/', getCards);

router.post('/', validateCard, createCard);

router.delete('/:cardId', validateCardParams, removeCard);

router.put('/:cardId/likes', validateCardParams, putCardLike);

router.delete('/:cardId/likes', validateCardParams, removeCardLike);

module.exports = router;
