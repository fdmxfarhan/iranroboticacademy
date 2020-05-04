var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
    fullname: String,
    uname: String,
    email: String,
    phone: Number,
    amount: Number,
    description: String,
    date: Date,
    payDate: Date,
    payed: Boolean
  });

var Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
