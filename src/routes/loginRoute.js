const express = require('express');

const emailValidation = require('../middlewares/emailValidation');
const passwdValidation = require('../middlewares/passwdValidation');

const router = express.Router();

const login = require('../login');

router.post('/', emailValidation, passwdValidation, (req, res) => {
  const token = login.randomKey();

  res.status(200).json({ token });
});

module.exports = router;