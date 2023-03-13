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
	getUserByPXCId,
	sendVerificationEmail,
	findUserByPhoneNumber,
	verifyUserEmail,
	verifyAllEmil,
	verifyEmail,
	updateUserBalanceByPXCPrice,
	registerMerchant,
	getAllUsersBalance,
	updatePXCMiningBalance,
	startPXCMining,
	isCompletedPXCMining,
	updatePXCMining,
	updateAllUsersBalance2,
	resendEmailVerificationCode,
	updateAllUsersIsNewUser,
	removeUserNotGmail,
} = require('../controllers/userController');
const { convertUsdtToPXC } = require('../controllers/usdtController');
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

// get User by PXC Id
router.route('/PXC-id').get(getUserByPXCId);

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
	.put(isAuthenticatedUser, updateUserBalanceByPXCPrice);

// merchant register
router.route('/merchant/register').post(upload.none(), registerMerchant);

// get all users balance === 0
router.route('/balance/zero').get(getAllUsersBalance);

// update PXC mining balance
router.route('/update-PXC-mining-balance').put(updatePXCMiningBalance);

// start PXC mining
router.route('/start-PXC-mining').put(isAuthenticatedUser, startPXCMining);

// is completed PXC mining
router
	.route('/is-completed-PXC-mining')
	.put(upload.none(), isAuthenticatedUser, isCompletedPXCMining);

// update PXC mining
router.route('/update-PXC-mining').put(updatePXCMining);

// update all users balance
router.route('/update-all-users-balance').put(updateAllUsersBalance2);

// convert usdt to PXC
router.route('/convert-usdt-to-PXC').put(isAuthenticatedUser, convertUsdtToPXC);

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

module.exports = router;
