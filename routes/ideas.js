const express = require('express');
const router = express.Router();
const ideasController = require('../controllers/ideasController');
const authToken = require('../middlewares/auth-token');

// Protect all routes below with the middleware
router.use(authToken);

router.get('/', ideasController.getIdeas);
router.post('/', ideasController.createIdea);
router.get('/:id', ideasController.getIdeaById);
router.post('/:id/vote', ideasController.voteIdea);
router.post('/:id/comments', ideasController.addComment);

module.exports = router;