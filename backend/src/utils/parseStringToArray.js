/**
 * Gets a string of values separated by comma.
 * Return a Array of Strings spliting by comma.
 */
module.exports = function parseStringToArray(values) {
  return values.split(',').map(s => s.trim());
}