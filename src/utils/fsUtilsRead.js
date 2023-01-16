const fs = require('fs').promises;
const { join } = require('path');

const path = '../talker.json';

// async function readTalkerData() {
//   try {
//     const dataRead = await fs.readFile(path, 'utf-8');
//     const talker = JSON.parse(dataRead);

//     return talker;
//   } catch (error) {
//     console.error(`Erro na leitura do arquivo ${error}`);
//   }
// }

async function readTalkerData() {
  const response = await fs.readFile(join(__dirname, path), 'utf-8');
  return JSON.parse(response);
}

module.exports = { readTalkerData };