var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const passport = require('passport');
var urlencodedparser = bodyparser.urlencoded({ extended: false});
const { ensureAuthenticated } = require('../config/auth');


router.get('/', function(req, res, next) {
  if(!req.user) res.render('./en/index', {
    uname: false
  });
  else res.render('./en/index', {
    uname: req.user.uname
  });
});

module.exports = router;
