let models = require('../models');
let bcrypt = require('bcrypt');
let passport = require('passport');
const passportSetup = require('../passportSetup')(passport);
let flash = require('connect-flash');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

exports.showLogin = function(req, res, next) {
  res.render('user/login', {formData: {}, errors: {}});
}

exports.showSignup = function(req, res, next) {
  res.render('user/signup', {formData: {}, errors: {}});
}

exports.login = function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: "/",
    failRedirect: "/login",
    failFlash: true
  })(req, res, next)
}

exports.signup = function(req, res, next) {
  const newUser = models.User.build({
    email: req.body.email,
    password: generateHash(req.body.password)
  })
  return newUser.save().then(result => {
    passport.authenticate('local', {
      successRedirect: "/",
      failRedirect: "/signup",
      failFlash: true
    })(req, res, next)
  })
}

exports.logout = function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
}
