const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

const { readTalkerData } = require('./fsUtilsRead');

async function writeTalkerData(data) {
  await fs.writeFile(join(__dirname, path), JSON.stringify(data, null, 2));
}

async function talkerEdit(req, res, next) {
  const id = Number(req.params.id);
  const talkers = await readTalkerData();
  const chosenTalker = talkers.find((talker) => talker.id === id);
  const index = talkers.indexOf(chosenTalker);
  const updated = { id, ...req.body };
  talkers.splice(index, 1, updated);
  await writeTalkerData(talkers);

  next();
}

module.exports = { writeTalkerData, talkerEdit };