var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const passport = require('passport');
var urlencodedparser = bodyparser.urlencoded({ extended: false});
const { ensureAuthenticated } = require('../config/auth');
var Education = require('../models/education');

var names = [];
Education.find({}, function(err, docs){
  for(var i = 0; i<docs.length ; i++){
    names.push(docs[i].name);
    router.get(`/${i}`, function(req, res, next) {
      var number = req.url[1]-'0';
      if(!req.user) res.render('./education/educations', {
        uname: false,
        names: names,
        number: number,
        education: docs[number]
      });
      else res.render('./education/educations', {
        uname: req.user.uname,
        user: req.user,
        names: names,
        number: number,
        education: docs[number]
      });
    });
  }
});

router.get('/add', ensureAuthenticated, function(req, res, next) {
  if(!req.user) res.render('./education/educations', {
    uname: false,
    names: names
  });
  else if(req.user.role != 'student') res.render('./education/add_education', {
    uname: req.user.uname,
    user: req.user,
    names: names,
    number: names.length
  });
  else res.redirect('/education/0');
});

router.post('/add', ensureAuthenticated, function(req, res, next){
  const { name, producer, date, sesion, time, files, description} = req.body;
  var number;
  let errors = [];
  if(!name || !producer || !date || !sesion || !time || !files || !description){
    errors.push({msg: 'لطفا موارد خواسته شده را تکمیل نمایید!'});
    res.render('./education/add_education', {
      errors: errors,
      uname: req.user.uname,
      user: req.user,
      names: names,
      number: names.length
    });
  }
  else{
    Education.find({}, (err, docs) => {
      console.log(docs);
      number = docs.length;
      const newEducation = new Education({ number ,name, producer, date, sesion, time, files, description});
      console.log(newEducation);
      newEducation.save().then(function(){
        req.flash('success_msg', 'آموزش جدید با موفقیت ثبت شد.با سپاس از زحمات شما.');
        res.redirect('/education/add');
      }).catch(err => console.log(err));
    });
  }
  // req.flash('success_msg', 'آموزش جدید با موفقیت ثبت شد.');
  // errors.push({msg: 'از این آدرس ایمیل یان نام کاربری قبلا استفاده شده!'});
});


module.exports = router;
