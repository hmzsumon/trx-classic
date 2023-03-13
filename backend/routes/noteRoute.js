const express = require('express');
const {
	creatNote,
	getAllNotes,
	myNotes,
	getSingleNote,
	updateNote,
	deleteNote,
} = require('../controllers/noteController');
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

// Create Note
router.route('/note/new').post(isAuthenticatedUser, creatNote);

// get all notes
router.route('/notes').get(getAllNotes);

router.route('/notes/me').get(isAuthenticatedUser, myNotes);
router.route('/notes/:id').get(isAuthenticatedUser, getSingleNote);
router.route('/notes/:id').put(isAuthenticatedUser, updateNote);
router.route('/notes/:id').delete(isAuthenticatedUser, deleteNote);

module.exports = router;
