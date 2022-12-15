const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
  try {
    const dataRead = await fs.readFile(path, 'utf-8');
    const talker = JSON.parse(dataRead);

    return talker;
  } catch (error) {
    console.error(`Erro na leitura do arquivo ${error}`);
  }
}

module.exports = { readTalkerData };