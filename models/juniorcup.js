var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    uname: String,
    fullname: String,
    phone: Number,
    email: String,
    reputation: Number,
    advertise: Boolean,
    documentation: Boolean,
    place: Boolean,
    referee: Boolean,
    staff: Boolean,
    web: Boolean,
    design: Boolean
  });

var Juniorcup = mongoose.model('Juniorcup', UserSchema);

module.exports = Juniorcup;
