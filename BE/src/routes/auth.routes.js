const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller')
const verifyJWT = require('../middleware/verifyJWT');

router.post('/post/login', authController.login);
router.get('/get/me', verifyJWT, authController.getUserLoggedIn);
router.post('/post/register', authController.register);

module.exports = router;