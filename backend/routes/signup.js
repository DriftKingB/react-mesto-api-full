const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateUser } = require('../middlewares/requestValidation');

router.post('/', validateUser, createUser);

module.exports = router;
