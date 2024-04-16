var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

router.get('/', function (req, res) {
  res.render('index', { title: 'Balls App', user: req.user });
});

router.get('/register', function (req, res) {
  res.render('register', { title: 'Balls App Registration' });
});

router.post('/register', async function (req, res) {
  try {
    const user = await Account.findOne({ username: req.body.username });

    if (user != null) {
      console.log("exists " + req.body.username);
      return res.render('register', {
        title: 'Registration',
        message: 'Existing User',
        account: req.body.username,
      });
    }

    let newAccount = new Account({ username: req.body.username });
    const registeredUser = await Account.register(newAccount, req.body.password);

    if (!registeredUser) {
      return res.render('register', {
        title: 'Registration',
        message: 'access error',
        account: req.body.username,
      });
    }

    console.log('Success, redirect');
    res.redirect('/');
  } catch (err) {
    console.error("Registration error: ", err);
    return res.render('register', {
      title: 'Registration',
      message: 'Registration error',
      account: req.body.username,
    });
  }
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Balls App Login', user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/ping', function(req, res) {
  res.status(200).send('pong!');
});

module.exports = router;