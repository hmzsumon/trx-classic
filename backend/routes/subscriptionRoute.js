const express = require('express');
const {
	getAllSubscription,
	subscriptionDetails,
	createSubscription,
	updateSubscription,
	deleteSubscription,
} = require('../controllers/subscriptionController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/subscriptions').get(getAllSubscription);

router
	.route('/admin/subscription/new')
	.post(isAuthenticatedUser, authorizeRoles('admin'), createSubscription);

router
	.route('/admin/subscription/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateSubscription)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSubscription);

router.route('/subscription/:id').get(subscriptionDetails);

module.exports = router;
