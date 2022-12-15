const fs = require('fs').promises;

async function writeTalkerData(data, path) {
  try {
    const dataWrite = await fs.writeFile(path, JSON.stringify(data, null, 2));

    return dataWrite;
  } catch (error) {
    console.error(`Erro na escrita do arquivo ${error}`);
  }
}

module.exports = { writeTalkerData };