var express = require('express');
var path = require('path');
var router = express.Router();
var bodyparser = require('body-parser');
const multer = require('multer');


router.use(bodyparser.urlencoded({extended: true}))
var storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, 'public/education')
 },
 filename: function (req, file, cb) {
   cb(null, req.body.fileName)
 }
});

var upload = multer({ storage: storage });

router.post('/pic', upload.single('myFile'), (req, res, next) => {
  console.log(req.body);
  const file = req.file;
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  res.redirect('/education/0')
});
router.post('/file', upload.single('myFile'), (req, res, next) => {
  console.log(req.body);
  const file = req.file;
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  res.redirect('/education/0')
});

module.exports = router;
