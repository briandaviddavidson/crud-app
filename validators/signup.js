let validator = require('validator');
let models = require('../models');

function validateCreateUserFields(errors, req) {
  if (!validator.isEmail(req.body.email)) {
    errors.email = "Please use a valid e-mail";
  }
  if (!validator.isAscii(req.body.password)) {
    errors.password = "Invalid characters in password. Please try again";
  }
  if (!validator.isLength(req.body.password, {min: 8, max: 25})) {
    errors.password = "Password is too short. Please try again";
  }
}

exports.validateUser = function (errors, req) {
  return new Promise(function(resolve, reject) {
    validateCreateUserFields(errors, req);
    return models.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user !==  null) {
        errors.email = "Email is already in use. Please login or reset your password"
      }
      resolve(errors);
    })
  })
}
