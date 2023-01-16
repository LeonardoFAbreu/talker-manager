const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

async function readTalkerData() {
  const response = await fs.readFile(join(__dirname, path), 'utf-8');
  return JSON.parse(response);
}

module.exports = { readTalkerData };