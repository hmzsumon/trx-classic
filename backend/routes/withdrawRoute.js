const express = require('express');
const multer = require('multer');
const {
	withdraw,
	updateSingleUserWithBalance,
	getWithdrawRequest,
	getAllWithdrawRequest,
	approvePendingWithdrawRequest,
	cancelPendingWithdrawRequest,
	createWithdrawDetails,
	createWithdrawDetailsForSingleUser,
	getSingleWithdraw,
	approveWithdraw,
	cancelWithdraw,
	getAllApprovedWithdraw,
} = require('../controllers/withdrawController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

const upload = multer({});

// with balance
router.route('/withdraw').post(upload.none(), isAuthenticatedUser, withdraw);

// update single user with balance
router.route('/withdraw-update/:id').put(updateSingleUserWithBalance);

// get login user withdraws
router.route('/withdraws').get(isAuthenticatedUser, getWithdrawRequest);

// get all withdraws for admin
router
	.route('/withdraws/all')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllWithdrawRequest);

// approved pending withdraws
router
	.route('/withdraws/approved/:id')
	.put(
		isAuthenticatedUser,
		authorizeRoles('admin'),
		approvePendingWithdrawRequest
	);

// cancel pending withdraws
router
	.route('/withdraws/cancel/:id')
	.put(upload.none(), isAuthenticatedUser, cancelPendingWithdrawRequest);

// create withdraw details for all users
router.route('/create/withdraw-details').post(createWithdrawDetails);

// create withdraw details for single user
router
	.route('/create/withdraw-details')
	.get(isAuthenticatedUser, createWithdrawDetailsForSingleUser);

// get single withdraw
router
	.route('/withdraw/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getSingleWithdraw);

// approve withdraw
router
	.route('/withdraw/approve')
	.put(
		upload.none(),
		isAuthenticatedUser,
		authorizeRoles('admin'),
		approveWithdraw
	);

// cancel withdraw
router
	.route('/withdraw/cancel')
	.put(
		upload.none(),
		isAuthenticatedUser,
		authorizeRoles('admin'),
		cancelWithdraw
	);

// get all approved withdraws
router.route('/withdraws/approved').get(getAllApprovedWithdraw);

module.exports = router;
