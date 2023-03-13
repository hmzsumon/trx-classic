const express = require('express');
const {
	createCompany,
	getCompanyAdmin,
	clearDailyWorkTodayWorkUsers,
} = require('../controllers/companyController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router
	.route('/company')
	.post(isAuthenticatedUser, authorizeRoles('admin'), createCompany);

router.route('/admin/company').get(getCompanyAdmin);

router
	.route('/admin/company/clear-daily-work-today-work-users')
	.put(
		isAuthenticatedUser,
		authorizeRoles('admin'),
		clearDailyWorkTodayWorkUsers
	);

module.exports = router;
