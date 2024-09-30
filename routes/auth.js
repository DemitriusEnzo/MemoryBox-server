const express = require('express');
const { registerUser, loginUser } = require('../services/authService');
const Joi = require('joi');

const router = express.Router();

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
});

const validateInput = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  next();
};

router.post('/register', validateInput, registerUser);
router.post('/login', validateInput, loginUser);

module.exports = router;
