var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');

module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback

    }, function (req, username, password, done) {
        User.findOne({
            'USERNAME': username
        }, function (err, user) {
            // if there are any errors, return the error before anything else
            //console.log(user);
            if (err) {
                console.log('error looking up user');
                return done(err);
            }

            // if no user is found, return the message
            if (!user) {
                console.log('wrong username');
                return done(null, false, {
                    message: 'Incorrect Username'
                }); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (user['PASSWORD'] != password) {
                console.log('wrong password');
                return done(null, false, {
                    message: 'Incorrect Password'
                }); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            return done(null, user);
        });
    }));

}