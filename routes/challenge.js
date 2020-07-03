var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(!req.user) res.render('./challenge/index', {
    user: false
  });
  else res.render('./challenge/index', {
    user: req.user
  });
});

module.exports = router;
