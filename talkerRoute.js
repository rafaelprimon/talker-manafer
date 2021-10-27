const express = require('express');
const { readFile } = require('fs').promises;

const router = express.Router();

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

module.exports = router;
