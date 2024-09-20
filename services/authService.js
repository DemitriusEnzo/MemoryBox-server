const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { readUsers, writeUsers } = require('../utils/fileUtils');
const { generateId } = require('../utils/idUtils');

const secretKey = process.env.SECRET_KEY || 'your_secret_key';

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('Registering user:', username);

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const users = await readUsers();
    if (users.some(user => user.username === username)) {
      console.log('Username already exists:', username);
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
};

const loginUser = async (req, res) => {
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
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser };
