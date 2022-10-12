const router = require('express').Router();

const { handleLogin } = require('../controllers/login');
const { validateUser } = require('../middlewares/requestValidation');

router.post('/', validateUser, handleLogin);

module.exports = router;
