var mongoose = require('mongoose');
var classNamesEn = ['scratch', 'c++', 'python', 'web', 'robotic', 'photoshop'];
var classNamesFa = ['برنامه نویسی مقدماتی Scratch', 'برنامه نویسی C++', 'برنامه نویسی python', 'برنامه نویسی web', 'رباتیک', 'طراحی گرافیک Photoshop'];

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
      enum: classNamesEn,
      required: true
    },
    className2: {
      type: String,
      required: true
    },
    price: {
      type: String,
      default: 200000,
      required: true
    },
    state: {
      type: String,
      enum: ['در حال برگزاری', 'در انتظار شروع', 'پایان یافته'],
      required: true
    },
    attend: {
      type: String,
      enum: ['real', 'virtual'],
      required: true
    },
    dateOfBegin: Date,
    dateOfend: Date
  });

var Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
