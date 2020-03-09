var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const passport = require('passport');
var urlencodedparser = bodyparser.urlencoded({ extended: false});
const islogin = false;
const { ensureAuthenticated } = require('../config/auth');
var data = [];
var num = 0;
var User = require('../models/User');
var Class = require('../models/Class');
var Tutorial = require('../models/Tutorial');
var Juniorcup = require('../models/juniorcup');


router.get('/arduino', function(req, res, next) {
  if(!req.user) res.render('./education/arduino', {
    uname: false
  });
  else res.render('./education/arduino', {
    uname: req.user.uname
  });
});


module.exports = router;
