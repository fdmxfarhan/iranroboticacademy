var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var urlencodedparser = bodyparser.urlencoded({ extended: false});
const islogin = false;
const { ensureAuthenticated } = require('../config/auth');
var User = require('../models/User');
var Class = require('../models/Class');
var Tutorial = require('../models/Tutorial');
var Juniorcup = require('../models/juniorcup');
var Payment = require('../models/Payment');
var Exam = require('../models/Exam');

router.get('/', function(req, res, next) {
  if(!req.user) res.render('index', {
    uname: false,
    user: false
  });
  else res.render('index', {
    uname: req.user.uname,
    user: req.user
  });
});

router.get('/notfound', function(req, res, next) {
  if(!req.user) res.render('error', {
    uname: false,
    user: false
  });
  else res.render('error', {
    uname: req.user.uname,
    user: req.user
  });
});

router.get('/dashboard', ensureAuthenticated, function(req, res, next){
  var messages = [];
  if(!req.user) res.render('dashboard', {
    uname: false,
    user: false
  });
  else if(req.user.role === 'student'){
    Class.find({uname: req.user.uname}, function(err, docs){
      Payment.find({uname: req.user.uname}, function(err, payments){
        if(req.query.login) messages.push({msg: 'به پنل کاربری خود خوش آمدید.'});
        var cnt = 0, active = { payment: false, reports: false, comments: false};
        for(var i=0 ; i<payments.length ; i++){
          if(!payments[i].payed) cnt++;
        }
        if(cnt > 0) {
          messages.push({msg: `شما ${cnt} صورت حساب پرداخت نشده دارید.`});
          active.payment = true;
        }
        console.log(messages);
        res.render('./dashboard/user-dashboard', {
          uname: req.user.uname,
          user: req.user,
          classes: docs,
          messages: messages,
          active: active
        });
      });
    });
  }
  else if(req.user.role == 'admin'){
    User.find({}, function(err, users){
      Class.find({}, function(err, classes){
        Payment.find({uname: req.user.uname}, function(err, payments){
          var active = { payment: false, reports: false, comments: false};
          if(req.query.login) messages.push({msg: 'به پنل کاربری خود خوش آمدید.'});
          var cnt = 0;
          for(var i=0 ; i<payments.length ; i++){
            if(payments[i].payed) cnt++;
          }
          if(cnt > 0) messages.push({msg: `شما ${cnt} صورت حساب پرداخت نشده دارید.`});  
          res.render('./dashboard/admin-dashboard', {
            uname: req.user.uname,
            user: req.user,
            users: users,
            classes: classes,
            messages: messages,
            active: active
          });
        });
      });
    });
  }
});

router.get('/dashboard/classes', ensureAuthenticated, function(req, res, next){
  if(req.user.role == 'admin'){
    Class.find({}, function(err, classes){
      var active = { payment: false, reports: false, comments: false};
      res.render('./dashboard/classes',{
        uname: req.user.uname,
        user: req.user,
        classes: classes,
        active: active
      });
    });
  }
  else res.send('Access denied!!');
});

router.get('/upgrade', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      if(doc){
        var active = { payment: false, reports: false, comments: false};
        res.render('dashboard/upgrade-user', {
          uname: req.user.uname,
          upgradeUser: doc,
          user: req.user,
          active: active
        });
      }
    });
  }
  else{
    res.redirect('/dashboard');
  }
});

router.get('/upgradetoadmin', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      User.updateMany({_id: doc._id}, { $set: { role: 'admin' } }, function(err){
        if(err) console.log(err);
        else res.redirect('/dashboard');
      });
    });
  }
  else{
    res.redirect('/register/login');
  }
});
router.get('/upgradetoteacher', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      User.updateMany({_id: doc._id}, { $set: { role: 'teacher' } }, function(err){
        if(err) console.log(err);
        else res.redirect('/dashboard');
      });
    });
  }
  else{
    res.redirect('/register/login');
  }
});

router.get('/upgradetostudent', ensureAuthenticated, function(req, res, next){
  if(req.user.role === 'admin'){
    User.findOne({uname: req.query.uname}, function(err, doc){
      User.updateMany({_id: doc._id}, { $set: { role: 'student' } }, function(err){
        if(err) console.log(err);
        else res.redirect('/dashboard');
      });
    });
  }
  else{
    res.redirect('/register/login');
  }
});

router.get('/payments', ensureAuthenticated, function(req, res, next){
  if(req.user.role == 'student'){
    Payment.find({uname: req.user.uname},function(err, payments){
      var active = { payment: false, reports: false, comments: false};
      res.render('./dashboard/payments', {
        uname: req.user.uname,
        user: req.user,
        payments: payments,
        active: active
      });
    });
  }
  else if(req.user.role == 'admin'){
    User.find({}, function(err, users){
      Payment.find({},function(err, payments){
        var active = { payment: false, reports: false, comments: false};
        res.render('./dashboard/payments', {
          uname: req.user.uname,
          user: req.user,
          users: users,
          payments: payments,
          active: active
        });
      });
    });
  }
});

router.get('/dashboard/plan', ensureAuthenticated, function(req, res, next){
  var active = { payment: false, reports: false, comments: false};
  res.render('./dashboard/plan',{
    uname: req.user.uname,
    user: req.user,
    active: active
  });
});

router.get('/dashboard/removeclass', ensureAuthenticated, function(req, res, next){
  if(req.user.role == 'admin'){
    Class.deleteOne({_id: req.query.id}).then(()=>{
      res.redirect('/dashboard/classes');
    });
  }
});

router.get('/quiz', function(req, res,next){
  if(req.user){
    res.render('quiz', {
      uname: req.user.uname,
      user: req.user
    });
  } else{
    res.render('quiz-register', {
      user: false
    });
  }
});

router.post('/quiz', function(req, res, next){
  const { uname, email , phone, education, fullname, psw} = req.body;
  const role = 'student', card = 0;
  let errors = [];
  /// check required
  if(!uname || !email || !phone || !education || !fullname || !psw){
    errors.push({msg: 'لطفا موارد خواسته شده را کامل کنید!'});
  }
  /// check password length
  if(psw.length < 4){
    errors.push({msg: 'رمز عبور شما بسیار ضعیف میباشد!'});
  }
  /// check password length
  if(education == 'null'){
    errors.push({msg: 'لطفا مقطع تحصیلی خود را مشخص کنید!'});
  }
  ///////////send evreything 
  if(errors.length > 0 ){
    res.render('quiz-register', { 
      errors, uname, email, phone, education, fullname, psw,
      user: false
    });
  }
  else{
    // validation passed
    User.findOne({ uname: uname})
      .then(user =>{
        if(user){
          // user exist
          errors.push({msg: 'از این آدرس ایمیل یان نام کاربری قبلا استفاده شده!'});
          res.render('quiz-register', { 
            errors, uname, email, phone, education, fullname, psw,
            user: false
          });
        }
        else {
          const newUser = new User({uname, email, phone, education, fullname, psw, role, card});
          console.log(newUser);
          // Hash password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.psw, salt, (err, hash) => {
            if(err) throw err;
            newUser.psw = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'ثبت نام با موفقیت انجام شد. اکنون میتوانید وارد شوید.');
                passport.authenticate('local', {
                  successRedirect: '/quiz',
                  failureRedirect: '/users/login',
                  failureFlash: true
                })(req, res, next);
              })
              .catch(err => console.log(err));
          }));
          console.log(newUser);
        }
      });
    
  }
});

router.post('/quiz-resault', ensureAuthenticated, function(req,res,next){
  const {ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8, ans9, ans10} = req.body;
  var cnt = 0;
  if(ans1) cnt++;
  if(ans2) cnt++;
  if(ans3) cnt++;
  if(ans4) cnt++;
  if(ans5) cnt++;
  if(ans6) cnt++;
  if(ans7) cnt++;
  if(ans8) cnt++;
  if(ans9) cnt++;
  if(ans10) cnt++;
  var robotic = 0, programming = 0;
  var text = '';
  // ----- Answer for 1
  if(ans1 == 'زیاد') robotic+=10;
  if(ans1 == 'متوسط') robotic+=5;
  if(ans1 == 'کم') robotic+=2;
  // ----- Answer for 2
  if(ans2 == 'زیاد') programming+=10;
  if(ans2 == 'متوسط') programming+=5;
  if(ans2 == 'کم') programming+=2;
  // ----- Text for 1 and 2
  if(robotic == programming) text+='شما به رباتیک و برنامه نویسی به یک اندازه علاقه مند هستید. ';
  else if(robotic > programming) text+='شما به حرفه رباتیک علاقه مند هستید. ';
  else if(robotic < programming) text+='شما به حرفه برنامه نویسی علاقه مند هستید. ';
  // ----- Answer for 3
  if(ans3 == 'یک یا دو') {programming+=5; text+='با دانشی که دارید یادگیری دیگر زبان های برنامه نویسی برایتان راحت خواهد بود. ';}
  if(ans3 == 'سه یا چهار') {programming+=10; text+='دانستن چند زبان برنامه نویسی به شما بسیار کمک خواهد کرد. ';}
  if(ans3 == 'بیش از چهار زبان') {programming+=15; text+='با زبان های برنامه نویسی بسیار زیادی آشنایی دارید. ';}
  // ----- Answer for 4
  if(ans4 == 'AVR') {robotic+=5; text+='آموختن کار با ماژول ها و میکروکنترلرهای ARM و PIC برایتان مفید است. ';}
  if(ans4 == 'Modules') {robotic+=10; text+='در حرفه رباتیک دانش بسیار خوبی دارید. ';}
  if(ans4 == 'ARM') {robotic+=15; text+='در حرفه رباتیک دانش بسیار خوبی دارید. ';}
  if(ans4 == 'همه موارد') {robotic+=30; text+='در حرفه رباتیک دانش بسیار خوبی دارید. ';}
  // ----- Answer for 5
  if(ans5 == 'برنامه نویسی ربات ها') {robotic+=10; text+='برنامه نویسی برای میکروکنترلر ها و ربات ها برایتان جذاب است. ';}
  if(ans5 == 'طراحی وب سایت') {programming+=10; text+='به طراحی وب سایت علاقه دارید. ';}
  if(ans5 == 'طراحی اپلیکیشن اندروید') {programming+=10; text+='به طراحی اپلیکیشن اندروید علاقه دارید. ';}
  if(ans5 == 'طراحی نرم افزارهای ویندوز') {programming+=10; text+='به طراحی نرم افزار های ویندوز علاقه دارید. ';}
  // ----- Answer for 6
  if(ans6 == 'زیاد') {programming+=10;robotic+=10; text+='تسلط شما به زبان انگلیسی بسیار کمکتان خواهد کرد. ';}
  if(ans6 == 'متوسط') {programming+=10;robotic+=10; text+='تسلط شما به زبان انگلیسی بسیار کمکتان خواهد کرد. ';}
  if(ans6 == 'کم') {programming+=10;robotic+=10; text+='افزایش تسلط بر زبان انگلیسی برایتان بسیار مفید خواهد بود. ';}
  if(ans6 == 'خیلی کم') {programming+=10;robotic+=10; text+='حتما سعی کنید زبان انگلیسی را بیاموزید و مهارت خود را افزایش دهید. ';}
  // ----- Answer for 7
  if(ans7 == 'Mechanic') robotic+=10;
  if(ans7 == 'Hardware') robotic+=10;
  if(ans7 == 'هر دو مورد') {robotic+=20; text+='با نرم افزار هایی که لازم است یک فرد در حرفه رباتیک در آن مهارت داشته باشد آشنایی دارید. ';}
  // ----- Answer for 8
  if(ans8 == 'Algorythm') {programming+=5;robotic+=5;}
  if(ans8 == 'Basic') {programming+=10;robotic+=10;}
  if(ans8 == 'High') {programming+=15;robotic+=10;}
  // ----- Answer for 9
  if(ans9 == 'ویندوز') {programming+=5;robotic+=5;}
  if(ans9 == 'ویندوز و مک') {programming+=10;robotic+=10;}
  if(ans9 == 'ویندوز و لینوکس') {programming+=15;robotic+=15; text+='کار با سیستم عامل لینوکس برای برنامه نویسی قطعا به پیشرفتتان کمک می کند. '}
  // ----- Answer for 10
  if(ans10 == 'کلاس های بیرون') text+='برای ادامه فعالیت خود در زمینه دلخواهتان می توانید در کلاس های آکادمی شرکت نمایید. ';
  if(ans10 == 'کلاس های آکادمی') text+='برای ادامه فعالیت خود خوب است باز هم در کلاس های آکادمی شرکت نمایید. ';
  if(ans10 == 'شرکت می کنم') text+='برای شرکت در کلاس های آکادمی باید کلاس مورد علاقه خود را انتخاب کنید. ';
  if(ans10 == 'تمایلی به شرکت در کلاس ها ندارم') text+='شرکت در کلاس های آکادمی می تواند به پیشرفت شما در زمینه دلخواهتان کمک کند.';
  
  const classes = {
    programming1: {name: 'برنامه نویسی مقدماتی Scratch', teacher: 'مینا یجیوی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/computer'},
    programming2: {name: 'برنامه نویسی C++', teacher: 'شیدا تارانی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/computer'},
    programming3: {name: 'برنامه نویسی Pthon', teacher: 'فرحان دائمی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/computer'},
    programming4: {name: 'طراحی وب', teacher: 'شیدا تارانی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/computer'},
    robotic1: {name: 'رباتیک مقدماتی', teacher: 'سودابه ماحسنی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/robotic'},
    robotic2: {name: 'رباتیک مسیریاب', teacher: 'سودابه ماحسنی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/robotic'},
    robotic3: {name: 'رباتیک فوتبالیست سبک وزن', teacher: 'مهدیه کارگران', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/robotic'},
    robotic4: {name: 'رباتیک فوتبالیست وزن آزاد', teacher: 'فرحان دائمی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/robotic'},
    robotic5: {name: 'ربات های صنعتی', teacher: 'فرحان دائمی', maxStudent: '۱۰ نفر', begin: '۱۴ تیر', end: '۱۷ مرداد', price: '250,000 تومان', url:'/classes/robotic'}
  };
  var myClasses = [];
  if(robotic > programming){
    if(robotic < 35){
      myClasses.push(classes.robotic1);
    }
    else if(robotic < 50){
      myClasses.push(classes.robotic2);
      myClasses.push(classes.robotic3);
    }
    else if(robotic < 75){
      myClasses.push(classes.robotic3);
      myClasses.push(classes.robotic4);
    }
    else{
      myClasses.push(classes.robotic3);
      myClasses.push(classes.robotic4);
      myClasses.push(classes.robotic5);
    }
  }
  else{
    if(programming < 40){
      myClasses.push(classes.programming1);
      myClasses.push(classes.programming3);
    }
    else if(programming < 50){
      myClasses.push(classes.programming2);
      myClasses.push(classes.programming3);
      myClasses.push(classes.programming4);
    }
    else{
      myClasses.push(classes.programming2);
      myClasses.push(classes.programming4);
    }
  }
  res.render('quiz-resault',{
    uname: req.user.uname,
    user: req.user,
    cnt,
    robotic,
    programming,
    text,
    myClasses
  });
});

router.get('/exam', function(req, res, next){
  if(req.user){
    res.render('./exam/index',{
      user: req.user
    });
  }
  else{
    res.render('./exam/index', {
      user: false
    });
  }
});

router.post('/exam/real', function(req, res, next){
  const {fullName, fatherName, schoolName, phone1, phone2} = req.body;
  const examName = 'آزمون های حضوری';
  if(!fullName || !fatherName || !schoolName || !phone1 || !phone2){
    res.send('لطفا موارد مشخص شده را تکمیل فرمایید');
  }
  else{
    const newExam = new Exam({examName, fullName, fatherName, schoolName, phone1, phone2});
    newExam.save().then((exam)=>{
      res.redirect('/exam');
    }).catch(err => console.log(err));
  }
});

router.post('/exam/virtual', function(req, res, next){
  const {fullName, fatherName, schoolName, phone1, phone2} = req.body;
  const examName = 'آزمون های غیر حضوری';
  if(!fullName || !fatherName || !schoolName || !phone1 || !phone2){
    res.send('لطفا موارد مشخص شده را تکمیل فرمایید');
  }
  else{
    const newExam = new Exam({examName, fullName, fatherName, schoolName, phone1, phone2});
    newExam.save().then((exam)=>{
      res.redirect('/exam');
    }).catch(err => console.log(err));
  }
});

router.post('/exam/class', function(req, res, next){
  const {fullName, fatherName, schoolName, phone1, phone2} = req.body;
  const examName = 'کلاس های تست';
  if(!fullName || !fatherName || !schoolName || !phone1 || !phone2){
    res.send('لطفا موارد مشخص شده را تکمیل فرمایید');
  }
  else{
    const newExam = new Exam({examName, fullName, fatherName, schoolName, phone1, phone2});
    newExam.save().then((exam)=>{
      res.redirect('/exam');
    }).catch(err => console.log(err));
  }
});

router.get('/dashboard/exam', ensureAuthenticated, (req, res, next)=>{
  if(req.user.role == 'admin'){
    var active = { payment: false, reports: false, comments: false};
    Exam.find({}, (err, exams)=>{
      res.render('./dashboard/exam', {
        user: req.user,
        exams,
        active
      });
    });
  }
  else res.send('دسترسی مجاز نیست!!')
});

module.exports = router;
