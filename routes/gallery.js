var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) res.render('gallery', {
    uname: false,
    user: false
  });
  else res.render('gallery', {
    uname: req.user.uname,
    user: req.user
  });
});

module.exports = router;
