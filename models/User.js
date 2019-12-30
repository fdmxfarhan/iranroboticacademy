var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    uname: String,
    email: String,
    phone: String,
    education: String,
    city: String,
    psw: String,
    role: String
  });

var User = mongoose.model('User', UserSchema);

module.exports = User;
