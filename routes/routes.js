/**
 * Created by Umar on 16/01/2017.
 */
// app/routes.js

module.exports = function(app, passport, createAuction) {

    /**
     * Homepage -> Index
     */
    app.get('/', function(req, res) {
        res.render('index.jade'); // load the index.html file
    });

    /**
     * Login form
     **/
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.jade', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/app', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    /**
     * Sign up form
     **/
    // show the signup form
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.jade', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/app', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    /**
     * Safety stuff
     */
    // we want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/app', isLoggedIn, function(req, res) {
        res.render('app.jade', {
            username : req.user.username // get the user out of session and pass to template
        });
    });

    /**
     * Logout safely
     */
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/createAuction', function(req, res) {
        /*console.log("username: " + req.user.username);
        createAuction.getIDFromName(req.user.username);
        createAuction.addAuctionEntry(req.body);*/
        createAuction.getIDFromName(req.user.username, function(id){
            createAuction.addAuctionEntry(req.body, id);
            res.end();
        });

        res.end("pablo");
    });
};

/**
 * Are they logged in?
 **/
// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
