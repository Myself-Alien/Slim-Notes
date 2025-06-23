// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var colors = require('@colors/colors');

const app = express(); 

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Connect to local MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/notes_app')
  .then(() => console.log(' Connected to MongoDB '))
  .catch((err) => console.error(err));

// Connection
const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);

// Route placeholder
app.get('/', (req, res) => {
  res.send(' Notes App Backend is Running! ');
});

// Listen
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT} `);
});
