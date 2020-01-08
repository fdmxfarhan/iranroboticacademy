var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    fullname: String,
    uname: String,
    email: String,
    day: String,
    hour: String,
    cls: String
  });

var Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
