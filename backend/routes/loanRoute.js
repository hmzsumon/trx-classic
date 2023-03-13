const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
	newLoanRequest,
	getAllLoanRequests,
	getSingleLoanRequest,
	approveLoanRequest,
	rejectLoanRequest,
} = require('../controllers/loanController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = multer({});

router.route('/loan/new').post(isAuthenticatedUser, newLoanRequest);

// get all loan requests for admin
router
	.route('/admin/loans')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllLoanRequests);

// get single loan request for admin
router.route('/loan/:id').get(isAuthenticatedUser, getSingleLoanRequest);

// approve loan request for admin
router
	.route('/admin/loan/approve/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), approveLoanRequest);

// reject loan request for admin
router
	.route('/admin/loan/reject/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), rejectLoanRequest);

module.exports = router;
