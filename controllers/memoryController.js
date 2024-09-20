const { readMemories, writeMemories } = require('../repositories/memoryRepository');
const { generateId } = require('../utils/idUtils');

const getUserMemories = async (username) => {
  const memories = await readMemories();
  return memories.filter(memory => memory.username === username);
};

const createMemory = async (memoryData) => {
  const memories = await readMemories();
  const newMemory = { id: generateId(), ...memoryData };
  memories.push(newMemory);
  await writeMemories(memories);
  return newMemory;
};

const updateMemory = async (memoryId, updatedData) => {
  const memories = await readMemories();
  const memoryIndex = memories.findIndex(memory => memory.id === memoryId);

  if (memoryIndex === -1) throw new Error('Memory not found');

  const updatedMemory = { ...memories[memoryIndex], ...updatedData };
  memories[memoryIndex] = updatedMemory;
  await writeMemories(memories);
  return updatedMemory;
};

const deleteMemory = async (memoryId) => {
  const memories = await readMemories();
  const memoryIndex = memories.findIndex(memory => memory.id === memoryId);

  if (memoryIndex === -1) throw new Error('Memory not found');

  memories.splice(memoryIndex, 1);
  await writeMemories(memories);
};

module.exports = { getUserMemories, createMemory, updateMemory, deleteMemory };
