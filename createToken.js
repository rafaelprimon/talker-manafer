const crypto = require('crypto');
// dica do Pedro no momento inicial - separar o token
const generateToken = () => crypto.randomBytes(8).toString('hex');
// https://qastack.com.br/programming/8855687/secure-random-token-in-node-js 
module.exports = generateToken;