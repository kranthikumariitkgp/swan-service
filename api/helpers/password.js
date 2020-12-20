const bcrypt = require('bcrypt');
const { saltRounds } = require('../common/constant');

const passwordEncode = async password => bcrypt.hash(password, saltRounds);

module.exports = {
  passwordEncode,
};
