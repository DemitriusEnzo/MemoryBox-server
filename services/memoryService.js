const { readMemories, writeMemories } = require('../repositories/memoryRepository');

const getUserMemories = async (username) => {
  const memories = await readMemories();
  return memories.filter(memory => memory.username === username);
};

const createMemory = async (memoryData) => {
  const memories = await readMemories();
  const newMemory = { id: Date.now(), ...memoryData };
  memories.push(newMemory);
  await writeMemories(memories);
  return newMemory;
};

const updateMemory = async (memoryId, updateData) => {
  const memories = await readMemories();
  const index = memories.findIndex(memory => memory.id === memoryId);
  if (index !== -1) {
    memories[index] = { ...memories[index], ...updateData };
    await writeMemories(memories);
    return memories[index];
  }
  throw new Error('Memory not found');
};

const deleteMemory = async (memoryId) => {
  const memories = await readMemories();
  const filteredMemories = memories.filter(memory => memory.id !== memoryId);
  await writeMemories(filteredMemories);
};

module.exports = {
  getUserMemories,
  createMemory,
  updateMemory,
  deleteMemory
};
