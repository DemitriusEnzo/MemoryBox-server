const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/users.json');
const secretKey = process.env.SECRET_KEY || 'your_secret_key';

const readUsers = async () => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data) || [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    console.error('Error reading users file:', err);
    throw err;
  }
};

const writeUsers = async (users) => {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
    throw err;
  }
};

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const users = await readUsers();
    if (users.some(user => user.username === username)) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: generateId(), username, password: hashedPassword };
    users.push(newUser);
    await writeUsers(users);
    res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const users = await readUsers();
    const user = users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
