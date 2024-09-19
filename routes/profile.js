const express = require('express');
const { getUserProfile, changePassword } = require('../services/userService');

const router = express.Router();

router.get('/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await getUserProfile(username);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.patch('/:username/password', async (req, res) => {
  const { username } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ success: false, message: 'New password is required' });
  }

  try {
    const updatedUser = await changePassword(username, newPassword);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

module.exports = router;
