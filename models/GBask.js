var mongoose = require('mongoose');

var GBaskSchema = new mongoose.Schema({
    uname: String,
    fullName: String,
    email: String,
    text: String
});

var GBask = mongoose.model('GBask', GBaskSchema);

module.exports = GBask;
