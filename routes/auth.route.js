const express = require('express')
const router = express.Router();
const AuthService = require('../src/services/auth.service')
const {userAuthentication} = require('../src/controllers/user.controller')

const authService = new AuthService();

router.post('/',(req, res, next) => userAuthentication(req, res, authService));

module.exports = router