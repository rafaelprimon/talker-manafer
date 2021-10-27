const express = require('express');
const { readFile, writeFile } = require('fs').promises;

const router = express.Router();
const {
  authenticatonToken,
  authenticationName,
  authenticationAge,
  authenticationTalk,
  authenticationTalkDate,
  authenticationRate,
} = require('./validations');

router.get('/', async (_req, res) => {
  try {
    const talkers = await readFile('./talker.json', 'utf-8');
    return res.status(200).json(JSON.parse(talkers));
  } catch (error) {
    return res.status(200).json([]);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile('./talker.json', 'utf-8');
  try {
    const getDataTalker = JSON.parse(talkers);
    const getTalker = getDataTalker.find((talker) => talker.id === parseInt(id, 10));
    if (!getTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(getTalker);
  } catch (error) {
    return res.status(500).end();
  }
});

router.post('/', 
  authenticatonToken,
  authenticationName,
  authenticationAge,
  authenticationTalk,
  authenticationTalkDate,
  authenticationRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    try {
      const talkers = await readFile('./talker.json', 'utf-8');
      const getDataTalker = await JSON.parse(talkers);
      const talkerNewId = getDataTalker.length + 1;
      getDataTalker.push({ id: talkerNewId, name, age, talk });
      await writeFile('talker.json', JSON.stringify(getDataTalker));
      return res.status(201).json({ id: talkerNewId, name, age, talk });
    } catch (error) {
      return error;
    }
  });

module.exports = router;
