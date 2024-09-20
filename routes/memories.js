const express = require('express');
const jwt = require('jsonwebtoken');
const {
  getUserMemories,
  createMemory,
  updateMemory,
  deleteMemory
} = require('../controllers/memoryController');

const router = express.Router();
const secretKey = process.env.SECRET_KEY || 'your_secret_key';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', authenticateToken, async (req, res) => {
  const { username } = req.query;
  try {
    const userMemories = await getUserMemories(username);
    res.json(userMemories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching memories' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const { username, title, date, icon } = req.body;
  try {
    const newMemory = await createMemory({ username, title, date, icon });
    res.status(201).json(newMemory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating memory' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  const memoryId = req.params.id;
  const { title, date, icon } = req.body;
  try {
    const updatedMemory = await updateMemory(memoryId, { title, date, icon });
    res.json(updatedMemory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const memoryId = req.params.id;
  try {
    await deleteMemory(memoryId);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
