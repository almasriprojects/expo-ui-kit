module.exports = function structuredClone(val) {
  return JSON.parse(JSON.stringify(val));
};
module.exports.default = module.exports;
