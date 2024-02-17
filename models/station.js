const mongoose = require("mongoose")
const stationSchema = new mongoose.Schema({
    stationCode: { type: String, required: true, unique: true },
    stationName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zone: { type: String }, // Railway zone for advanced features
    latitude: { type: Number }, // Optional for geolocation features
    longitude: { type: Number }, // Optional for geolocation features
    amenities: { type: Array } // Optional for listing station amenities
},{timestamps:true})

module.exports = mongoose.model('station', stationSchema);