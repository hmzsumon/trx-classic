const express = require('express');
const multer = require('multer');
const {
	newWithdrawRequest,
	userWithdrawRequests,
	updateCompanyWithdrawBalance,
	allWithdrawRequests,
	getSingleWithdrawRequest,
	approveWithdrawRequest,
	updateAllWithdrawRequestsLastPrice,
	cancelWithdrawRequest,
} = require('../controllers/withdrawController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();
const upload = multer({});

router
	.route('/new/withdraw')
	.post(upload.none(), isAuthenticatedUser, newWithdrawRequest);
// user withdraw requests
router.route('/user/withdraws').get(isAuthenticatedUser, userWithdrawRequests);

// update company withdraw balance
router.route('/update/company/withdraw').put(updateCompanyWithdrawBalance);

// get all withdraw requests for admin
router
	.route('/admin/withdraws')
	.get(isAuthenticatedUser, authorizeRoles('admin'), allWithdrawRequests);

// get single withdraw request for admin
router
	.route('/withdraw/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getSingleWithdrawRequest);

// approve withdraw request by id
router
	.route('/withdraw/approve')
	.put(isAuthenticatedUser, authorizeRoles('admin'), approveWithdrawRequest);

// update all withdraw requests last price
router
	.route('/update/withdraws/last-price')
	.put(updateAllWithdrawRequestsLastPrice);

// cancel withdraw request by id
router
	.route('/withdraw/cancel')
	.put(isAuthenticatedUser, authorizeRoles('admin'), cancelWithdrawRequest);

module.exports = router;
