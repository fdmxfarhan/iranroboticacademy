var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
const { ensureAuthenticated } = require('../config/auth');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Booklet = require('../models/Booklet');

router.post('/add', ensureAuthenticated, (req, res, nex)=> {
    const {uname, amount, description} = req.body;
    if(req.user.role == 'admin'){
        User.findOne({uname: uname}, (err, doc)=>{
            if(doc){
                newPayment = new Payment({
                    fullname: doc.fullname,
                    uname: doc.uname,
                    email: doc.email,
                    phone: doc.phone,
                    amount: amount,
                    description: description,
                    date: Date.now(),
                    payed: false
                });
                newPayment.save()
                    .then(()=>{
                        res.redirect('/payments');
                    }).catch((err)=> console.log(err));
            }
        });
    }
});
router.get('/remove', ensureAuthenticated, (req, res, nex)=> {
  const id = req.query.id;
  if(req.user.role == 'admin'){
    Payment.deleteOne({_id: id}).then(()=>{
      res.redirect('/payments');
    });
  }
});

router.post('/pay', function(req,res, next){
  Payment.findOne({_id: req.body.order_id}, (err, payment)=>{
    if(payment){
      var options2 = {
        method: 'POST',
        url: 'https://api.idpay.ir/v1.1/payment/verify',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': '233d166c-7bf4-416f-8c16-228e7b1e9a1d',
          // 'X-SANDBOX': 1,
        },
        body: {
          'id': req.body.id,
          'order_id': req.body.order_id,
        },
        json: true,
      };
      request(options2, function (error, response, body) {
        if (error) throw new Error(error);
        if(body.status == 100){
          Payment.updateMany({_id: payment._id}, { $set: { payed: true } }, function(err){
            if(err) console.log(err);
            res.render('./dashboard/success-pay', {
              payment: payment,
              payed: body
            });
          });
        }
        else{
          res.render('./dashboard/fail-pay', {
            payment: payment
          });
        }
      });
    }
    else res.send('Error!!!!!!!!!!!');
  });
});

router.get('/pay', function(req, res, next){
  Payment.findOne({_id: req.query.id}, function(err, payment){
    var options = {
      method: 'POST',
      url: 'https://api.idpay.ir/v1.1/payment',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': '233d166c-7bf4-416f-8c16-228e7b1e9a1d',
        // 'X-SANDBOX': 1,
      },
      body: {
        'order_id': payment._id,
        'amount': payment.amount,
        'name': payment.fullname,
        'uname': payment.uname,
        'phone': payment.phone,
        'mail': payment.email,
        'desc': payment.description,
        'callback': 'http://iranroboticacademy.com/payment/pay',
        'reseller': null,
      },
      json: true,
    };
    request(options, function (error, response, body) {
      if (error) console.log(error);
      res.redirect(body.link);
    });  
  });
});
router.post('/pay-booklet', function(req,res, next){
  if(req.user){
    var newBooklet = new Booklet({uname: req.user.uname, name: req.body.name, price: req.body.price, payed: false});
    newBooklet.save().then((booklet)=>{
      var options = {
        method: 'POST',
        url: 'https://api.idpay.ir/v1.1/payment',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'fe6a4553-cd95-4dff-af2e-80594c1c18c5',
          'X-SANDBOX': 1,
        },
        body: {
          'order_id': booklet._id,
          'amount': booklet.price,
          'name': req.user.fullname,
          'uname': req.user.uname,
          'phone': req.user.phone,
          'mail': req.user.email,
          'desc': req.body.name,
          'callback': `http://iranroboticacademy.com/payment/esp`,
          'reseller': null,
        },
        json: true,
      };
      request(options, function (error, response, body) {
        if (error) console.log(error);
        // console.log(body);
        res.redirect(body.link);
      });  
    }).catch(err => console.log(err));
  }
  else res.redirect('/users/login');
});
router.post('/esp', function(req,res, next){
  Booklet.findOne({_id: req.body.order_id}, (err, booklet)=>{
    if(payment){
      var options2 = {
        method: 'POST',
        url: 'https://api.idpay.ir/v1.1/payment/verify',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': 'fe6a4553-cd95-4dff-af2e-80594c1c18c5',
          'X-SANDBOX': 1,
        },
        body: {
          'id': req.body.id,
          'order_id': req.body.order_id,
        },
        json: true,
      };
      request(options2, function (error, response, body) {
        if (error) throw new Error(error);
        if(body.status == 100){
          Booklet.updateMany({_id: booklet._id}, { $set: { payed: true } }, function(err){
            if(err) console.log(err);
            res.render('./booklets/esp', {
              user: false,
              booklet
            });
          });
        }
        else{
          res.render('./dashboard/fail-pay', {
            payment: payment
          });
        }
      });
    }
    else res.send('Error!!!!!!!!!!!');
  });
});


module.exports = router;