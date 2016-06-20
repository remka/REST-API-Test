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

  app.get('/burgers', function(req, res) {
    res.render('../app/views/burgers.ejs', {
      nav_name: 'nav_burgers'
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

        burger.userId = req.user._id;
        burger.nameRomaji  = req.body.nameRomaji;
        burger.nameJapanese = req.body.nameJapanese;
        burger.location = [req.body.location.long, req.body.location.lat];
        burger.address_1 = req.body.address_1;
        burger.address_2 = req.body.address_2;
        burger.address_3 = req.body.address_3;
        burger.city = req.body.city;
        burger.county_province = req.body.county_province;
        burger.zip = req.body.zip;
        burger.region = req.body.region;
        burger.country = req.body.country;
        burger.address_other = req.body.address_other;
        burger.hasNonSmoker = req.body.hasNonSmoker;
        burger.hasVegetarian = req.body.hasVegetarian;
        burger.takesReservations = req.body.takesReservations;
        burger.isHidden = req.body.isHidden;

        // Save the chat message if there are no errors
        burger.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Burger saved!' });
        });
  });

  // Protect dashboard route with JWT
  apiRoutes.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
  });

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
