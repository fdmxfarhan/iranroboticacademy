var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true
    },
    uname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    term: {
      type: String,
      enum: ['بهار', 'تابستان', 'پاییز', 'زمستان'],
      required: true
    },
    className: {
      type: String,
      enum: ['robotic', 'programming', 'electronic'],
      required: true
    },
    price: {
      type: String,
      default: 200000,
      required: true
    },
    dateOfBegin: Date,
    dateOfend: Date
  });

var Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
