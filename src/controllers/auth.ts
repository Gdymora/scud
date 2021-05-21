const User = require('../models/User')

module.exports.login = function(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

// localhost:5000/api/auth/register
module.exports.register = function(req, res) {
  const user = new User({
    email: req.body.password
  })
  console.log(user)
 // user.save().then(() => console.log('User created'))
}