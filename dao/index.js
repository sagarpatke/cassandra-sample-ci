/* eslint global-require: "off" */
/* eslint import/no-dynamic-require: "off" */

const { dao } = require('../config');

module.exports = {
  get cartoonsDAO() {
    return require(`./${dao}/cartoons`);
  },
};
