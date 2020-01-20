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


router.get('/', ensureAuthenticated, function(req, res, next) {
    if(!req.user) res.render('juniorcup2020', {
    uname: false
    });
    else res.render('juniorcup2020', {
    uname: req.user.uname,
    user: req.user
    });
});


module.exports = router;
