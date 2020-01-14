module.exports = function parseStringToArray(values) {
  return values.split(',').map(s => s.trim());
}