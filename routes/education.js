var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const passport = require('passport');
var urlencodedparser = bodyparser.urlencoded({ extended: false});
const { ensureAuthenticated } = require('../config/auth');
var Education = require('../models/education');

router.get('/', function(req, res, next) {
  Education.find({}, function(err, educations){
    if(req.query.name){
      Education.findOne({name: req.query.name}, (err, doc)=>{
        if(!req.user) {
          res.render('./education/educations', {
            uname: false,
            user: false,
            educations: educations,
            education: doc
          });
        }
        else {
          res.render('./education/educations', {
            uname: req.user.uname,
            user: req.user,
            educations: educations,
            education: doc
          });
        }
      });
    }
    else{
      if(!req.user) {
        res.render('./education/index', {
          uname: false,
          user: false,
          educations: educations
        });
      }
      else {
        res.render('./education/index', {
          uname: req.user.uname,
          user: req.user,
          educations: educations
        });
      }
    }
  });
});

router.get('/add', ensureAuthenticated, function(req, res, next) {
  Education.find({}, function(err, docs){
    if(!req.user) res.render('./education/educations', {
      uname: false,
      user: false,
      educations: docs
    });
    else if(req.user.role != 'student') res.render('./education/add_education', {
      uname: req.user.uname,
      user: req.user,
      educations: docs
    });
    else res.redirect('/education/0');
  });
});

router.post('/add', ensureAuthenticated, function(req, res, next){
  const { title, name, producer, date, session, description} = req.body;
  var number;
  let errors = [];
  if(!title || !name || !producer || !date || !session || !description){
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
    Education.findOne({name: name}, (err, doc) => {
      if(doc){
        errors.push({msg: 'این نام قبلا ثبت شده!'});
        res.render('./education/add_education', {
          errors: errors,
          uname: req.user.uname,
          user: req.user,
          names: names,
          number: names.length
        });
      }
      else{
        const newEducation = new Education({ title ,name, picture: '', producer, date, session, description, PDF: [], videoURL: []});
        newEducation.save().then(function(){
          req.flash('success_msg', 'آموزش جدید با موفقیت ثبت شد.با سپاس از زحمات شما.');
          res.redirect('/education/add');
        }).catch(err => console.log(err));
      }
    });
  }
});

router.get('/upload-image', ensureAuthenticated,  (req, res, next)=>{
  Education.find({}, function(err, educations){
    Education.findOne({name: req.query.name}, (err, doc)=>{
      if(req.user.role == 'admin' || req.user.role == 'teacher'){
        res.render('./education/upload-photo', {
          uname: req.user.uname,
          user: req.user,
          educations: educations,
          education: doc
        });
      }
    });
  });
});

router.post('/add-video', ensureAuthenticated, (req, res, next)=>{
  if(req.user.role == 'admin'){
    Education.findOne({name: req.body.name}, function(err, education){
      var videoURL = education.videoURL;
      var newVideo = {link: req.body.link, title: req.body.title};
      videoURL.push(newVideo);
      Education.updateMany({_id: education._id}, {$set: {videoURL: videoURL}}, (err)=> {
        if(err) throw err;
        res.redirect(`/education?name=${req.body.name}`);
      });
    });
  }
});

module.exports = router;
