const jwt = require('jsonwebtoken');
 
const generateToken = (payload, key) => jwt.sign(payload, key);

const decodeToken = (token, key) => jwt.verify(token, key);

//const token = generateToken({email:'kranthi@xyz.com', role: 'client'}, 'secretKey');
//console.log(token);

module.exports = {
    generateToken,
    decodeToken,
}
