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
var fileUpload = require('express-fileupload');
var fs = require('fs');

router.get('/',  function(req, res, next) {
    if(!req.user) res.render('juniorcup2020', {
    uname: false
    });
    else res.render('juniorcup2020', {
    uname: req.user.uname,
    user: req.user
    });
});

router.post('/cooprate', function(req, res, next){
    var checkbox = [7];
    if(req.body.advertise)      checkbox[0] = true;
    else                        checkbox[0] = false;
    if(req.body.documentation)  checkbox[1] = true;
    else                        checkbox[1] = false;
    if(req.body.place)          checkbox[2] = true;
    else                        checkbox[2] = false;
    if(req.body.referee)        checkbox[3] = true;
    else                        checkbox[3] = false;
    if(req.body.staff)          checkbox[4] = true;
    else                        checkbox[4] = false;
    if(req.body.web)            checkbox[5] = true;
    else                        checkbox[5] = false;
    if(req.body.design)         checkbox[6] = true;
    else                        checkbox[6] = false;
    let errors = [];
    if(!req.body.fullname || !req.body.phone || !req.body.reputation || !req.body.email){
        errors.push({msg: 'لطفا موارد خواسته شده را کامل کنید!'});
    }
    if(req.body.reputation <= 0){
        errors.push({msg: 'لطفا سابقه کاری خود را صحیح وارد کنید!'});
    }
    if(errors.length > 0)   res.render('juniorcup2020', { errors, user: req.user});
    else {
        Juniorcup.findOne({ uname: req.user.uname})
        .then(user => {
            if(user){
                errors.push({msg: 'قبلا درخواست خود را ثبت کرده اید!'});
                res.render('juniorcup2020', { errors, user: req.user});
              }
            else {
                const Cooprator = new Juniorcup({
                    uname: req.user.uname,
                    fullname: req.body.fullname,
                    phone: req.body.phone,
                    email: req.body.email,
                    reputation: req.body.reputation,
                    advertise: checkbox[0],
                    documentation: checkbox[1],
                    place: checkbox[2],
                    referee: checkbox[3],
                    staff: checkbox[4],
                    web: checkbox[5],
                    design: checkbox[6]
                });
                Cooprator.save()
                .then(user => {
                    req.flash('success_msg', 'درخواست شما با موفقیت ثبت شد. در صورت تایید درخواست با شما تماس گرفته خواهد شد.');
                    res.redirect('/juniorcup2020');
                })
                .catch(err => console.log(err));
            }
        });
    }
});

router.post('/upload', function(req, res, next){
    console.log(req.body);
    fs.appendFile(req.body.cv);
    res.redirect('/juniorcup2020');
});
module.exports = router;
