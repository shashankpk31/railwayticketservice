const User = require('../models/user');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const UserLog = require("../models/userlog");

exports.register = asyncHandler(async (req, res, next) => {
    const { username, password, email, phoneNumber, firstName, gender, lastName, dateOfBirth, aadharNumber, address } = req.body;
    const user = await User.create({ username: username.toLowerCase(), password, email: email.toLowerCase(), gender: gender.toLowerCase(), phoneNumber, firstName, lastName, dateOfBirth: new Date(dateOfBirth), aadharNumber, address });
    const confirmEmailToken = user.generateEmailConfirmToken();
    const confirmEmailURL = `${process.env.FRONT_END}/confirm-email/${confirmEmailToken}`;
    const message = `You are receiving this mail so you can confirm that you are trying to register on our website
                   Kindly click on ${confirmEmailURL} to confirm`;
    user.save({
        validateBeforeSave: false
    });
    const userLog = new UserLog({
        userId: user._id,
        action: 'Registration',
        ipAddress: req.ip,
    });

    await userLog.save();
    const sendConfirmMail = await sendEmail({
        email: user.email,
        subject: 'RailwayIrctc Email confirmation token',
        message,
    });

    sendTokenResponse(user, 200, res);
})

exports.login = asyncHandler(async (req, res, next) => {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }
    const user = await User.findOne({
        $or: [
            { email: req.body.usernameOrEmail },
            { username: req.body.usernameOrEmail }
        ]
    }).select("+password");
    if (!user) {
        return next(new ErrorResponse('Invalid  user', 400));
    }
    const match = await user.matchPassword(password);
    if (!match) {
        return next(new ErrorResponse('Invalid  password', 400));
    }
    const userLog = new UserLog({
        userId: user._id,
        action: 'Logged in',
        ipAddress: req.ip,
    });

    await userLog.save();
    sendTokenResponse(user, 200, res);
})

exports.logout = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    if (!user) {
        res.status(400).json({ message: 'user not available' });
    }
    console.log(user);
    const userLog = new UserLog({
        userId: user.id,
        action: 'Logged out',
        ipAddress: req.ip,
    });

    await userLog.save();

    res.status(200).json({ message: 'Logged out successfully' });
})

exports.confirmEmail = asyncHandler(async (req, res, next) => {

    if (!req.params.token) {
        return (new ErrorResponse('No token available', 400));
    }
    const splitToken = req.params.token.split('.')[0];
    const confirmEmailToken = crypto.createHash('sha256').update(splitToken).digest('hex');
    const user = await User.findOne({
        confirmEmailToken,
        emailConfirm: false
    });

    if (!user) {
        return (new ErrorResponse('invalid available', 400));
    }

    user.confirmEmailToken = undefined;
    user.emailConfirm = true;

    user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res);
})

exports.getUser = asyncHandler(async (req, res, next) => {
    const user = req.user;
    console.log(user);
    
    if (!user) {
        res.status(400).json({
            success: false,
            message: 'user not found',
            data: user
        })
    }

    res.status(200).json({
        success: true,
        user: {
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.dateOfBirth,
            gender: user.gender,
            aadharNumber: user.aadharNumber,
            address: user.address,
            emailConfirm: user.emailConfirm,
            passengers: user.passengers,
            tickets: user.tickets
        }
    })
})

exports.updateDetails = asyncHandler(async (req, res, next) => {
    const { phoneNumber, aadharNumber, address } = req.body;
    const fieldToUpdate = { phoneNumber, aadharNumber, address };

    const user = await User.findByIdAndUpdate(req.user.id, fieldToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    })

})

exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!(await user.matchPassword(req.body.currentPassword))) {
        return next(new ErrorResponse('Password is incorrect', 400));
    }
    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
})

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
        $or: [
            { email: req.body.usernameOrEmail },
            { username: req.body.usernameOrEmail }
        ]
    });

    if (!user) {
        return next(new ErrorResponse('There is no any user with that email or username', 200))
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONT_END}/reset-password/?token=${resetToken}`;
    const message = `This message is for the reset password of the website by clicking on the ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token Railwayz',
            message,
        });

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorResponse('Email could not be sent', 500));
    }
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resettoken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorResponse('Invalid token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
})

const sendTokenResponse = asyncHandler(async (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(process.env.JWT_EXPIRE * 12 * 60 * 60 * 1000),
        httpOnly: true,
    }
    if (process.env.NODE_ENV == "production") {
        options.secure = true;
    }
    res.status(statusCode).json({
        token,
        options,
        message: 'handle token and options properly in ui'
    })
})


