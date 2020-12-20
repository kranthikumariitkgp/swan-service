
const { storeUsers } = require('../helpers/mongo');
const { passwordEncode } = require('../helpers/password');
const { successMessage, errorMessage, errorStatusCode } = require('../common/constant');

const createUser = async (req, res) => {
  try {
    const reqBody = req.body;
    if (reqBody.password) {
      reqBody.password = await passwordEncode(reqBody.password);
    }
    await storeUsers(reqBody);
    res.json(successMessage);
  } catch (e) {
    res.statusCode = errorStatusCode;
    res.json(errorMessage);
  }
};

module.exports = {
  createUser,
};
