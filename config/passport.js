// config/passport.js

var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);
var helper = require('../appModules/passportHelper.js');

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    /**************************************************************************
     * Passport session start-up
     **************************************************************************/

    /**
     * used to serialize the user for the session
     */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    /**
     * used to deserialize the user
     */
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });


    /**
     * Local Signup deals with all sign up related instructions
     */
    passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                var email = req.body.email;
                var contactNumber = req.body.contactNumber;
                var accountType = req.body.accountType;
                var address = req.body.addressNum + req.body.postcode;
                address = (address.replace(/\s/g, '')).toUpperCase();
                //address = address.toUpperCase();
                console.log('acc typeo ' + address);
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                //
                if(username.length < 1){
                    return done(null, false, req.flash('signupMessage', 'You need to include a username'));
                }
                if(contactNumber.length < 10){
                    return done(null, false, req.flash('signupMessage', 'The number is too short to be a number'));
                }
                if( address.length < 5) {
                    return done(null, false, req.flash('signupMessage', 'You need to include a number and postcode'));
                }
                if( password.length < 1) {
                    return done(null, false, req.flash('signupMessage', 'You need to include a password'));
                }

                connection.query("SELECT * FROM users WHERE username = ? OR email = ? OR contactNumber =? OR address =?",[username, email, contactNumber, address], function(err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    }
                    else {
                        // if there is no user with that username
                        // create the user
                        var newUserMysql = {
                            username: username,
                            email: email,
                            contactNumber: contactNumber,
                            accountType: accountType,
                            address: address,
                            password: bcrypt.hashSync(password, null, null)// use the generateHash function in our user model
                        };

                        var insertQuery = 'INSERT INTO users SET ?';
                        console.log(newUserMysql);
                        connection.query(insertQuery,[newUserMysql],function(err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        });
                    }
                });
            })
    );


    /**
     * Local login deals with all login info
     */
    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with email and password from our form
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows[0]);
                });
            })
    );


    /**
     * Local Signup deals with all sign up related instructions
     */
   /* passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },

            function(req, username, password, done) {
                var email = req.body.email;
                var contactNumber = req.body.contactNumber;
                var accountType = req.body.accountType;
                var address = req.body.addressNum + req.body.postcode;
                address = (address.replace(/\s/g, '')).toUpperCase();
                //address = address.toUpperCase();
                console.log('acc typeo ' + address);
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                if(email.length < 1 || contactNumber.length < 1 ||
                    password.length < 1 || username.length < 1 || address.length < 1) {
                    return done(null, false, req.flash('signupMessage', 'Missing info, please fill all fields'));
                }
                var reqCPY = req;
                var unique;

                helper.isUniqueInfo(address, reqCPY, function(isUnique, msg) {
                    unique = isUnique;
                    if(unique === false){
                        console.log(msg + isUnique + '2');
                        return done(null, false, req.flash('signupMessage', msg));
                    }
                    if(unique === true){
                        // if there is no user with that username
                        // create the user
                        console.log('tis happening');

                        var newUserMysql = {
                            username: username,
                            email: email,
                            contactNumber: contactNumber,
                            accountType: accountType,
                            address: address,
                            password: bcrypt.hashSync(password, null, null)// use the generateHash function in our user model
                        };

                        if(unique === true) {
                            var insertQuery = 'INSERT INTO users SET ?';
                            //console.log(newUserMysql);
                            connection.query(insertQuery, newUserMysql, function (err, rows) {
                                newUserMysql.id = rows.insertId;
                                return done(null, newUserMysql);
                            });
                        }
                    }
                });
            })
    );*/
};
