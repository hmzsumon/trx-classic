const express = require('express');
const multer = require('multer');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { buypxc, sellpxc } = require('../controllers/pxcController');

const upload = multer({});

// buy pxc by usdx
router.route('/buypxc').post(upload.none(), isAuthenticatedUser, buypxc);

// sell pxc for usdx
router.route('/sellpxc').post(upload.none(), isAuthenticatedUser, sellpxc);

module.exports = router;
