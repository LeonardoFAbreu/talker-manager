const express = require('express');

const app = express();
app.use(express.json());

const { readTalkerData } = require('../utils/fsUtilsRead');
const { writeTalkerData, talkerEdit } = require('../utils/fsUtilsWrite');

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

router.put('/:id', 
tokenValidation,
ageValidation,
nameValidation,
talkValidation,
rateValidation,
watchedValidation, 
talkerEdit, async (req, res) => {
  const id = Number(req.params.id);
  const chosenTalker = { id, ...req.body };

  return res.status(200).json(chosenTalker);
  });

router.delete('/:id', tokenValidation, async (req, res) => {
  const data = await readTalkerData('../talker.json');
  const { id } = req.params;
  const filteredData = data.filter((talkers) => talkers.id !== Number(id));
  await writeTalkerData('../talker.json', filteredData);

  return res.status(204).json();
});

module.exports = router;