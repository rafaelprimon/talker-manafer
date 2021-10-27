const authenticatonToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const authenticationName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const authenticationAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const authenticationTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
     });
  }
  next();
};

const authenticationTalkDate = (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  // https://pt.stackoverflow.com/questions/371316/valida%C3%A7%C3%A3o-regex-de-data-com-2-2-4-caracteres
  const date = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  if (!date.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const authenticationRate = (req, res, next) => {
  const { talk } = req.body;
  if (parseInt(talk.rate, 10) < 1 || parseInt(talk.rate, 10) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  authenticatonToken,
  authenticationName,
  authenticationAge,
  authenticationTalk,
  authenticationTalkDate,
  authenticationRate,
};
