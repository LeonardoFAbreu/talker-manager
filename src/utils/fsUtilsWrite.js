const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

async function writeTalkerData(data) {
  await fs.writeFile(join(__dirname, path), JSON.stringify(data, null, 2));
}

module.exports = { writeTalkerData };