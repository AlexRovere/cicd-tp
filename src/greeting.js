function getGreeting(name) {
  if (typeof name === 'string' && name.trim() !== '') {
    return `Hello ${name}!`;
  }
  return "Hello world!";
}

module.exports = { getGreeting };
