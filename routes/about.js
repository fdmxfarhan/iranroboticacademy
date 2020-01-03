var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) res.render('about', {
    uname: false
  });
  else res.render('about', {
    uname: req.user.uname
  });
});

module.exports = router;
