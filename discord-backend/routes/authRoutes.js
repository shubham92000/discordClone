const express = require('express');
const authController = require('../controllers/auth/authController');
const Joi = require('joi');
const verifyToken = require('../middleware/auth');
const validator = require('express-joi-validation').createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

const loginSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

const router = express.Router();

router.post(
  '/register',
  validator.body(registerSchema),
  authController.controller.postRegister
);
router.post(
  '/login',
  validator.body(loginSchema),
  authController.controller.postLogin
);

router.get('/test', verifyToken, (req, res) => {
  res.send('test');
});

module.exports = router;
