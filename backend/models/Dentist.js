const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String, // image URL
  },
  qualification: {
    type: String,
  },
  experience: {
    type: Number, // years
  },
  clinicName: {
    type: String,
  },
  address: {
    type: String,
  },
  location: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Dentist', dentistSchema);