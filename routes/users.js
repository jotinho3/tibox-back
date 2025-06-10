const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authToken = require('../middlewares/auth-token');

// Protect all routes below with the middleware
router.use(authToken);

router.get('/', usersController.getUsers);

module.exports = router;