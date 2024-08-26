const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const memoryRoutes = require('./routes/memories');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/memories', memoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});