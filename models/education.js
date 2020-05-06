var mongoose = require('mongoose');

var educationSchema = new mongoose.Schema({
  title: String,
  name: {
    type: String,
    required: true
  },
  picture: String,
  producer: String,
  date: String,
  session: Number,
  description: String,
  PDF: [String],
  videoURL: [Object],
  active: {
    type: Boolean,
    default: true
  },
  colection: {
    type: String,
    enum: ['robotic', 'programming', 'electronic'],
    default: 'robotic'
  },

});

var education = mongoose.model('Education', educationSchema);

module.exports = education;
