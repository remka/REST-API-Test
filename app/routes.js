// Import dependencies
var passport = require('passport');
var express = require('express');
var config = require('./config/main');
var jwt = require('jsonwebtoken');

// Bring in defined Passport Strategy
require('./config/passport')(passport);

// helpers
var helpers = require('./utils');

// Load models
var User = require('./models/user');
var Chat = require('./models/burgershop');

// Export the routes for our app to use
module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    res.render('../app/views/index.ejs', {
      nav_name: 'nav_index'
    });
  });

  app.get('/about', function(req, res) {
    res.render('../app/views/about.ejs', {
      nav_name: 'nav_about'
    });
  });

  app.get('/apidoc', function(req, res) {
    res.render('../app/views/apidoc.ejs', {
      nav_name: 'nav_apidoc'
    });
  });

  // Initialize passport for use
  app.use(passport.initialize());


  // Create API group routes
  var apiRoutes = express.Router();

  apiRoutes.get('/', function(req, res) {
    res.json({ success: true, message: 'Welcome to the API.' });
  });

  // Register new users
  apiRoutes.post('/auth/register', function(req, res) {
    if(!req.body.email || !req.body.password) {
      res.json({ success: false, message: 'Please enter email and password.' });
    } else {
      var newUser = new User({
        email: req.body.email,
        password: req.body.password,
        approvalToken: helpers.generateUUID()
      });

      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.'});
        }
        res.json({ success: true, message: 'Successfully created new user.' });
      });
    }
  });

  // Authenticate the user and get a JSON Web Token to include in the header of future requests.
  apiRoutes.post('/auth/login', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, config.secret, {
              expiresIn: 10080 // in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
          }
        });
      }
    });
  });

  // POST to create a new message from the authenticated user
  apiRoutes.get('/burgers', function(req, res) {
    res.json({ message: 'All burgers here!' });
  });

  // POST to create a new message from the authenticated user
  apiRoutes.post('/burgers', passport.authenticate('jwt', { session: false }), function(req, res) {

    var burger = new Burger();
        chat.from = req.user._id;
        chat.to = req.body.to;
        chat.message_body = req.body.message_body;

        // Save the chat message if there are no errors
        chat.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Message sent!' });
        });
  });

  // Protect dashboard route with JWT
  apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
  });

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
