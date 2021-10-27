const express = require('express');

const router = express.Router(); 

const crypto = require('crypto');

const generateToken = () => crypto.randomBytes(16).toString('hex');
// https://qastack.com.br/programming/8855687/secure-random-token-in-node-js 

const checksEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (email === ' ') { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const checksPassword = (req, res, next) => {
  const { password } = req.body;
  const passwordLenght = 5;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password === ' ') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length <= passwordLenght) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next(); 
};

router.post('/', generateToken, checksEmail, checksPassword, (req, res, _next) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;
