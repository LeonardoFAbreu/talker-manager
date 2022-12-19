const express = require('express');

const router = express.Router();

const login = require('../login');

router.post('/', (req, res) => {
  const token = login.randomKey();

  res.status(200).json({ token });
});

module.exports = router;