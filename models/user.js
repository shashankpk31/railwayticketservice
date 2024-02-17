const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require("../utils/errorResponse");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: [true, 'Phone Number is already registered']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender:{
        type:String,
        enum:['male','female','others']
    },
    aadharNumber: {
        type: String,
        unique: [true, 'aadhar number is already registered']
    },
    address: {
        type: String
    },
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    }],
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    emailConfirm: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordDate: Date,
    confirmEmailToken: String,
    role: {
        type: String,
        enum: ['user', 'agent', 'admin'],
        default:'user'
    }
}, {
    timestamps: true
});


userSchema.pre('save',async function (next){
    if (this.getAge(this.dateOfBirth)<18) {
        next(new ErrorResponse('This is mandatory that you should be more than 18 age',400));
    }
    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.getAge=(date)=>{
    var birthday = new Date(date);
    return ~~((Date.now() - birthday) / (31557600000));
}

userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

userSchema.methods.generateEmailConfirmToken = function (next) {
    const confirmationToken = crypto.randomBytes(20).toString('hex');
    this.confirmEmailToken = crypto.createHash('sha256').update(confirmationToken).digest('hex');
    const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
    const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
    return confirmTokenCombined;
};


module.exports = mongoose.model('user', userSchema);