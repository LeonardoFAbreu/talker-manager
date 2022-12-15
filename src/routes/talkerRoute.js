const express = require('express');
const talker = require('../talker');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talker.readTalkerData();

  return res.status(200).json(talkers);
});

module.exports = router;