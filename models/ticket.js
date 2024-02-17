const mongoose = require("mongoose")
const ticketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schedule',
        required: true
    },
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'passenger'
    },
    trainClass: {
        type: String,
        required: true
    },
    sourceStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station',
        required: true
    },
    destinationStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station',
        required: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
        required: true
    },
    paidStatus: Boolean,
    cancellation: Boolean
}, { timestamps: true })

module.exports = mongoose.model('ticket', ticketSchema);