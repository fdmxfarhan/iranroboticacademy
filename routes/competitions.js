var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) res.render('./competitions/competitions', {
    uname: false
  });
  else res.render('./competitions/competitions', {
    uname: req.user.uname
  });
});

router.get('/juniorcup2018', function(req, res, next) {
  if(!req.user) res.render('./competitions/juniorcup2018', {
    uname: false
  });
  else res.render('./competitions/juniorcup2018', {
    uname: req.user.uname
  });
});
router.get('/juniorcup2019', function(req, res, next) {
  if(!req.user) res.render('./competitions/juniorcup2019', {
    uname: false
  });
  else res.render('./competitions/juniorcup2019', {
    uname: req.user.uname
  });
});


module.exports = router;
