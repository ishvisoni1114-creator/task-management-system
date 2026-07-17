const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { validate, userValidations } = require('../middleware/validation');

router.post('/register', validate(userValidations.register), register);
router.post('/login', validate(userValidations.login), login);
router.get('/profile', authenticate, getProfile);

module.exports = router;