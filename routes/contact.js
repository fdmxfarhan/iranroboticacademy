var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) res.render('contact', {
    uname: false,
    user: req.user
  });
  else res.render('contact', {
    uname: req.user.uname,
    user: req.user
  });
});

module.exports = router;
