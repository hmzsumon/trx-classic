const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
	createDeposit,
	getUserDeposits,
	getAllDeposits,
	approveDeposit,
	deleteAllPendingDeposits,
	getSingleDeposit,
	cancelDeposit,
} = require('../controllers/depositController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = multer({});
// get all deposits
router.get(
	'/admin/deposits',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	getAllDeposits
);
router.post('/deposit', upload.none(), isAuthenticatedUser, createDeposit);

// get logged in user's deposits
router.get('/deposits/me', isAuthenticatedUser, getUserDeposits);

// get single deposit
router.get('/deposit/:id', isAuthenticatedUser, getSingleDeposit);

// approve a single deposit
router.put(
	'/deposit/approve/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	approveDeposit
);

// delete all pending deposits
router.delete('/deposit/delete/pending', deleteAllPendingDeposits);

// cancel a single deposit by admin
router.put(
	'/deposit/cancel',
	upload.none(),
	isAuthenticatedUser,
	authorizeRoles('admin'),
	cancelDeposit
);

module.exports = router;
