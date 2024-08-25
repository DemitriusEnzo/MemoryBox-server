const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');

const router = express.Router();
const memoriesFilePath = path.join(__dirname, '../data/memories.json');
const secretKey = process.env.SECRET_KEY || 'your_secret_key';

const readMemories = async () => {
  try {
    const data = await fs.readFile(memoriesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading memories file:', error);
    return [];
  }
};

const writeMemories = async (memories) => {
  try {
    await fs.writeFile(memoriesFilePath, JSON.stringify(memories, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to memories file:', error);
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/', authenticateToken, async (req, res) => {
  const username = req.query.username;
  const memories = await readMemories();
  const userMemories = memories.filter(memory => memory.username === username);
  res.json(userMemories);
});

router.post('/', authenticateToken, async (req, res) => {
  const { username, title, date, icon } = req.body;
  const memories = await readMemories();
  const newMemory = {
    id: Date.now().toString(),
    username,
    title,
    date,
    icon
  };
  memories.push(newMemory);
  await writeMemories(memories);
  res.status(201).json(newMemory);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const memoryId = req.params.id;
  const { title, date, icon } = req.body;
  const memories = await readMemories();
  const memoryIndex = memories.findIndex(memory => memory.id === memoryId);

  if (memoryIndex === -1) {
    console.log('Memory not found with id:', memoryId);
    return res.status(404).json({ message: 'Memory not found' });
  }

  const updatedMemory = { ...memories[memoryIndex], title, date, icon };
  memories[memoryIndex] = updatedMemory;
  await writeMemories(memories);
  console.log('Memory updated successfully:', updatedMemory);
  res.json(updatedMemory);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  const memoryId = req.params.id;
  const memories = await readMemories();
  const memoryIndex = memories.findIndex(memory => memory.id === memoryId);

  if (memoryIndex === -1) {
    console.log('Memory not found with id:', memoryId);
    return res.status(404).json({ message: 'Memory not found' });
  }

  memories.splice(memoryIndex, 1);
  await writeMemories(memories);
  console.log('Memory deleted successfully with id:', memoryId);
  res.status(204).end();
});

module.exports = router;
