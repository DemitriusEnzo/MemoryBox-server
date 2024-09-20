const fs = require('fs').promises;
const path = require('path');

const memoriesFilePath = path.join(__dirname, '../data/memories.json');

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

module.exports = { readMemories, writeMemories };
