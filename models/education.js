var mongoose = require('mongoose');

var educationSchema = new mongoose.Schema({
  number: Number,
  name: String,
  producer: String,
  date: String,
  sesion: String,
  time: String,
  description: String
});

var education = mongoose.model('Education', educationSchema);

module.exports = education;
