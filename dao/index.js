/* eslint global-require: "off" */

module.exports = {
  get cartoonsDAO() {
    return require('./mock/cartoons');
  },
};
