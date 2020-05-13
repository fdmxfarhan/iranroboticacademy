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


router.get('/arm', function(req, res, next) {
    if(!req.user) res.render('./booklets/arm', {
        uname: false,
        user: false
    });
    else res.render('./booklets/arm', {
        uname: req.user.uname,
        user: req.user
    });
});

router.get('/pixy', function(req, res, next) {
    if(!req.user) res.render('./booklets/pixy', {
        uname: false,
        user: false
    });
    else res.render('./booklets/pixy', {
        uname: req.user.uname,
        user: req.user
    });
});

router.get('/gy25', function(req, res, next) {
    if(!req.user) res.render('./booklets/gy25', {
        uname: false,
        user: false
    });
    else res.render('./booklets/gy25', {
        uname: req.user.uname,
        user: req.user
    });
});

router.get('/ultrasonic', function(req, res, next) {
    if(!req.user) res.render('./booklets/ultrasonic', {
        uname: false,
        user: false
    });
    else res.render('./booklets/ultrasonic', {
        uname: req.user.uname,
        user: req.user
    });
});

// router.get('/bootstrap', function(req, res, next) {
//     if(!req.user) res.render('./booklets/bootstrap', {
//         uname: false
//     });
//     else res.render('./booklets/bootstrap', {
//         uname: req.user.uname
//     });
// });

// router.get('/htmlcss', function(req, res, next) {
//     if(!req.user) res.render('./booklets/htmlcss', {
//         uname: false
//     });
//     else res.render('./booklets/htmlcss', {
//         uname: req.user.uname
//     });
// });

// router.get('/php', function(req, res, next) {
//     if(!req.user) res.render('./booklets/php', {
//         uname: false
//     });
//     else res.render('./booklets/php', {
//         uname: req.user.uname
//     });
// });

// router.get('/nodejs', function(req, res, next) {
//     if(!req.user) res.render('./booklets/nodejs', {
//         uname: false
//     });
//     else res.render('./booklets/nodejs', {
//         uname: req.user.uname
//     });
// });


module.exports = router;