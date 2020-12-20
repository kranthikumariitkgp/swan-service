const bcrypt = require('bcrypt');

const saltRounds = 10;

const passwordEncode = async password => bcrypt.hash(password, saltRounds);

module.exports = {
  passwordEncode,
};
