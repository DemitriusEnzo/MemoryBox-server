const fs = require('fs').promises;
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

const readUsers = async () => {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data) || [];
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

const writeUsers = async (users) => {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    throw err;
  }
};

module.exports = { readUsers, writeUsers };
