const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User model
const Orp = require('../models/Orphanage');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Orp.findOne({
        email: email
      }).then(orp => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, orp.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, orp);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, orp.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, orp) {
      done(err, orp);
    });
  });
};
