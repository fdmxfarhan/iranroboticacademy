var mongoose = require('mongoose');

var BookletSchema = new mongoose.Schema({
    uname: String,
    name: String,
    price: Number,
    payed: Boolean
  });

var Booklet = mongoose.model('Booklet', BookletSchema);

module.exports = Booklet;
