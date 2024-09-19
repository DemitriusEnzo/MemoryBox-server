const { readUsers, writeUsers } = require('../utils/fileUtils');
const bcrypt = require('bcrypt');

const getUserProfile = async (username) => {
  const users = await readUsers();
  const user = users.find(user => user.username === username);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const updateUser = async (username, newUsername, newPassword) => {
  const users = await readUsers();
  const userIndex = users.findIndex(user => user.username === username);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  if (newUsername) {
    users[userIndex].username = newUsername;
  }

  if (newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].password = hashedPassword;
  }

  await writeUsers(users);
  return users[userIndex];
};

const changePassword = async (username, newPassword) => {
  const users = await readUsers();
  const userIndex = users.findIndex(user => user.username === username);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  users[userIndex].password = hashedPassword;
  
  await writeUsers(users);
  return users[userIndex];
};

module.exports = { getUserProfile, updateUser, changePassword };
