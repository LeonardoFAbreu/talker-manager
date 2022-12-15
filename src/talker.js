const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

async function readTalkerData() {
  try {
    const response = await fs.readFile(join(__dirname, path), 'utf-8');

    return JSON.parse(response);
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

const readTalkers = async () => {
  const talkers = await readTalkerData();
  return talkers;
};

const readTalkerId = async (id) => {
  const talkers = await readTalkerData();
  return talkers.filter((talker) => talker.id === id);
};

module.exports = { 
  readTalkerData,
  readTalkers,
  readTalkerId,
};