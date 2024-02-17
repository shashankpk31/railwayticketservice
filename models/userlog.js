const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['Logged in', 'Logged out', 'Created post', 'Updated profile','Registration'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  }
});

module.exports = mongoose.model('UserLog', UserLogSchema);