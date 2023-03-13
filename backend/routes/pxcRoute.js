const express = require('express');
const multer = require('multer');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const { buyPXC, sellPXC } = require('../controllers/PXCController');

const upload = multer({});

// buy PXC by usdx
router.route('/buyPXC').post(upload.none(), isAuthenticatedUser, buyPXC);

// sell PXC for usdx
router.route('/sellPXC').post(upload.none(), isAuthenticatedUser, sellPXC);

module.exports = router;
