var express = require('express');
var path = require('path');
var router = express.Router();
var bodyparser = require('body-parser');
const multer = require('multer');
var Education = require('../models/education');


router.use(bodyparser.urlencoded({extended: true}));

var storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, 'public/education')
 },
 filename: function (req, file, cb) {
   cb(null, file.originalname)
 }
});

var upload = multer({ storage: storage });

router.post('/pic', upload.single('myFile'), (req, res, next) => {
  console.log(req.file);
  const file = req.file;
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  else{
    Education.findOne({name: req.body.name}, (err, doc)=>{
      Education.updateMany({_id: doc._id}, { $set: { picture: req.file.originalname } }, function(err){
        if(err) throw err;
      });
    });
  }
  res.redirect(`/education?name=${req.body.name}`);
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
