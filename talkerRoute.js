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

module.exports = router;
