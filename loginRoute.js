const express = require('express');
const generateToken = require('./createToken');

const router = express.Router(); 

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
  const passwordLength = 5;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password === ' ') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length <= passwordLength) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next(); 
};

router.post('/', checksEmail, checksPassword, (_req, res, _next) => {
  res.status(200).json({ token: generateToken(16) });
});

module.exports = router;
