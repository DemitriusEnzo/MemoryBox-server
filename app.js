require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const memoryRoutes = require('./routes/memories');
const profileRoutes = require('./routes/profile');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://memory-box-rho.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/profile', profileRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
