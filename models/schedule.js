const mongoose = require("mongoose")
const scheduleSchema = new mongoose.Schema({
    trainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'train',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    stoppages: [{
        stationId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'station'
        },
        time: Date
    }],
    fareTable: { type: Object }
}, {});

module.exports = mongoose.model('schedule', scheduleSchema);