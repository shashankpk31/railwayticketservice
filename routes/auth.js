const express = require('express');
const router = express.Router();
const { register, login, getUser, confirmEmail,
        updateDetails, forgotPassword, updatePassword,
        resetPassword, logout } = require('../controller/auth');
const { protect } = require("../middleware/auth");

router.post('/register', register);
router.post('/login', login);
router.post('/confirm-email/:token', confirmEmail);
router.post('/forget-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/welcome', protect, getUser);
router.post('/update-details', protect, updateDetails);
router.post('/update-password', protect, updatePassword);
router.post('/logout',protect ,logout);

module.exports = router;