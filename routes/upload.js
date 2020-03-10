var express = require('express');
var path = require('path');
var router = express.Router();
var bodyparser = require('body-parser');
const multer = require('multer');


router.use(bodyparser.urlencoded({extended: true}))
var storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, 'uploads')
 },
 filename: function (req, file, cb) {
   cb(null, file.fieldname + '-' + Date.now() + '.png')
 }
});

var upload = multer({ storage: storage });

router.post('/cv', upload.single('myFile'), (req, res, next) => {
    console.log(req.file);
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    
});

module.exports = router;
