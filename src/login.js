const randomKeyLength = 16;

function randomKey() {
  let randomString = '';
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charLength = char.length;
  for (let index = 0; index < randomKeyLength; index += 1) {
    randomString += char.charAt(Math.floor(Math.random() * charLength));
  }
  return randomString;
}

module.exports = { randomKey };