const express = require('express');
const multer = require('multer');
const {
	registerUser,
	loginUser,
	logout,
	forgotPassword,
	resetPassword,
	getUserDetails,
	updatePassword,
	updateProfile,
	getAllUser,
	getSingleUser,
	updateUserRole,
	deleteUser,
	updateAllUsersBalance,
	getUserBypxcId,
	sendVerificationEmail,
	findUserByPhoneNumber,
	verifyUserEmail,
	verifyAllEmil,
	verifyEmail,
	updateUserBalanceBypxcPrice,
	registerMerchant,
	getAllUsersBalance,
	updatepxcMiningBalance,
	startpxcMining,
	isCompletedpxcMining,
	updatepxcMining,
	updateAllUsersBalance2,
	resendEmailVerificationCode,
	updateAllUsersIsNewUser,
	removeUserNotGmail,
} = require('../controllers/userController');
const sendEmail = require('../utils/sendEmail');
const { convertUsdtTopxc } = require('../controllers/usdtController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const User = require('../models/userModel');

const router = express.Router();

const upload = multer({});

router.route('/register').post(upload.none(), registerUser);

router.route('/login').post(upload.none(), loginUser);

router.route('/password/forgot').post(upload.none(), forgotPassword);

router.route('/password/reset').post(upload.none(), resetPassword);

router.route('/logout').put(logout);

router.route('/me').get(isAuthenticatedUser, getUserDetails);

router
	.route('/password/update')
	.put(upload.none(), isAuthenticatedUser, updatePassword);

router.route('/me/update').put(isAuthenticatedUser, updateProfile);

// update all users balance
router.route('/balance/update').put(updateAllUsersBalance);

// get User by pxc Id
router.route('/pxc-id').get(getUserBypxcId);

router
	.route('/admin/users')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

router
	.route('/admin/user/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

// send verification email
router.route('/verify-email').post(isAuthenticatedUser, sendVerificationEmail);

// find user by phone number
router.route('/find-user').get(findUserByPhoneNumber);

// validate user email
// router.route('/verify/:id/:token').put(verifyUserEmail);

// all email verification
// router.route('/verify-all-email').put(verifyAllEmil);

// update user balance
router
	.route('/update-balance')
	.put(isAuthenticatedUser, updateUserBalanceBypxcPrice);

// merchant register
router.route('/merchant/register').post(upload.none(), registerMerchant);

// get all users balance === 0
router.route('/balance/zero').get(getAllUsersBalance);

// update pxc mining balance
router.route('/update-pxc-mining-balance').put(updatepxcMiningBalance);

// start pxc mining
router.route('/start-pxc-mining').put(isAuthenticatedUser, startpxcMining);

// is completed pxc mining
router
	.route('/is-completed-pxc-mining')
	.put(upload.none(), isAuthenticatedUser, isCompletedpxcMining);

// update pxc mining
router.route('/update-pxc-mining').put(updatepxcMining);

// update all users balance
router.route('/update-all-users-balance').put(updateAllUsersBalance2);

// convert usdt to pxc
router.route('/convert-usdt-to-pxc').put(isAuthenticatedUser, convertUsdtTopxc);

// verify email
router.route('/verify-email/with-code').post(upload.none(), verifyEmail);

// resend email verification code
router
	.route('/resend-email-verification-code')
	.post(resendEmailVerificationCode);

// update all users is new user
router.route('/update-all-users-is-new-user').put(updateAllUsersIsNewUser);

// remove user not gmail
router.route('/remove-user-not-gmail').put(removeUserNotGmail);

// test email
router.route('/test-email').post((req, res) => {
	sendEmail({
		email: req.body.email,
		subject: 'Test Email',
		message: 'This is a test email',
	});
	res.status(200).json({
		success: true,
		message: 'Email sent',
	});
});

module.exports = router;
