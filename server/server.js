const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is Running');
});

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server runnin at port 5000'.yellow.bold));
