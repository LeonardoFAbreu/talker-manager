const express = require('express');
// const fs = require('fs').promises;
// const path = require('path');

const app = express();
app.use(express.json());

const { readTalkerData } = require('../utils/fsUtilsRead');
const { writeTalkerData } = require('../utils/fsUtilsWrite');

const talker = require('../talker');
const tokenValidation = require('../middlewares/tokenValidation');
const ageValidation = require('../middlewares/ageValidation');
const nameValidation = require('../middlewares/nameValidation');
const rateValidation = require('../middlewares/rateValidation');
const talkValidation = require('../middlewares/talkValidation');
const watchedValidation = require('../middlewares/watchedValidation');

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

router.post('/', 
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
rateValidation, 
watchedValidation, async (req, res) => {
  const allTalkers = await readTalkerData();
  const newTalker = {
    id: allTalkers.length + 1,
    ...req.body,
  };
  allTalkers.push(newTalker);
  await writeTalkerData(allTalkers);
  return res.status(201).json(newTalker);
});

// router.put('/:id', 
// tokenValidation,
// ageValidation,
// nameValidation,
// talkValidation,
// rateValidation,
// watchedValidation, async (req, res) => {
//   const { id } = req.params;
//   const talkers = await JSON.parse(fs.readFile('./talker.json'));
//   const index = talkers.findIndex((_talker) => talker.id === Number(id));
//   talkers[index] = {
//     id: Number(id), ...req.body,
//   };
//   await fs.writeFile('./talker.json', JSON.stringify(talkers, null, 2));
//   res.status(200).json(talkers[index]);
// });

module.exports = router;