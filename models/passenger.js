const mongoose = require(mongoose);

const passengerSchema = new mongoose.Schema({
    pName: {
        type: String,
        required: true
    },
    pDateOfBirth: {
        type: String,
        required: true
    },
    pGender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    aadharNum: {
        type: String,
        required: true
    },
    mealPreference: {
        type: String
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    }
}, { timestamp: true })


mongoose.exports = mongoose.model('passenger', passengerSchema);