const express = require('express');
const cors = require('cors');
const ideasRoutes = require('./routes/ideas');
const usersRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use('/ideas', ideasRoutes);
app.use('/users', usersRoutes);

module.exports = app;