const express = require('express');
const talker = require('../talker');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talker.readTalkerData();

  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const talkerId = await talker.readTalkerId(Number(id));
    if (talkerId.length <= 0) {
      return res
        .status(404)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talkerId[0]);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

module.exports = router;