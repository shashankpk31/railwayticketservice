const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    payment_method: {
        type: String,
        required: true,
        enum:['Credit Card','UPI','Debit Card']
    }, 
    amount: {
        type: Number,
        required: true
    }, // Ticket price + any applicable fees
    currency: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Completed', 'Failed']
    },
    payment_gateway: {
        type: String,
        enum: ['Stripe', 'Razorpay']
    },
    processed_at: {
        type: Date,
        default: Date.now
    },
    refunded_amount: {
        type: Number
    } 
}, { timestamps: true });

module.exports = mongoose.model("payment", paymentSchema);
