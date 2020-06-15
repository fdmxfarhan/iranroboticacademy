var mongoose = require('mongoose');

var examSchema = new mongoose.Schema({
  examName: String,
  fullName: String,
  fatherName: String,
  schoolName: String,
  phone1: String,
  phone2: String
});

var exam = mongoose.model('Exam', examSchema);

module.exports = exam;
