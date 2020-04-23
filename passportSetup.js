let localStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let models = require('./models');

function validPassword (user, password) {
  return bcrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  passport.deserializeUser((id, done) => {
    models.User.findOne({
      where: {
        'id': id
      }
    }).then(user => {
      if (user === null) {
        done(new Error('Wrong user id'));
      }
      done(null, user);
    })
  });
  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    return models.User.findOne({
      where: {
        'email': email
      }
    }).then(user => {
      if (user === null) {
        req.flash('message', 'Incorrect credentials')
        return done(null, false);
      } else if (user.password === null || user.password === undefined) {
        req.flash('message', 'Please reset your password')
        return done(null, false);
      } else if (!validPassword(user, password)) {
        req.flash('message', 'Password is incorrect')
        return done(null, false);
      }
      return done(null, user);
    }).catch(error => {
      done(error, false);
    })
  }))
}
