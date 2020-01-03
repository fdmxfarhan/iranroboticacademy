var mongoose = require('mongoose');

var TutorialSchema = new mongoose.Schema({
    uname: String,
    email: String,
    day: String,
    hour: String,
    cls: String
  });

var Tutorial = mongoose.model('Tutorial', TutorialSchema);

module.exports = Tutorial;
