/**
 * Created by Umar on 16/01/2017.
 *
 * This is the routes js file: Here you will see a variety of entry points to the application to provide
 * the base application such as login, sign up, index, app .jade. In addition you can also see other end points
 * for get and post request to manipulate the application state such as createAuction().
 */

var auctionListeners = {};
var currentAuctions = {};
var postAucData = require('../appModules/postAuctionDataGetter');
var auctionCompTasks = require('../appModules/auctionCompletionTasks');
var userUtilities = require('../appModules/userUtilities');
var adminData = require('../appModules/adminData');

module.exports = {

    /**
     * Updates the auction specific variables, this is called by app.js after
     * it has initialised the server... very important if the server ever goes down
     * at any point, a method of updating app state.
     */
    updateAuctionVar : function(currentAucs, aucListeners){
        currentAuctions = currentAucs;
        console.log("updating initialise AuctionEngine variables");
        auctionListeners = aucListeners;
    },

    /**
     * Initialises the routes.js, is called by app.js, also area where the libraries and modules are originally imported.
     *
     * @param app
     * @param passport
     * @param createAuction
     * @param io
     * @param auctionEventEmitter
     */
    init : function(app, passport, createAuction, io, auctionEventEmitter){
        /**
         * Homepage -> Index (LOGIN)
         */
        app.get('/', function(req, res) {
            res.render('index.jade');
        });

        /**
         * Login form
         **/
        app.get('/login', function(req, res) {
            res.render('login.jade', { message: req.flash('loginMessage') });
        });

        /**
         * Process the login form
         */
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
         */
        app.get('/signup', function(req, res) {
            res.render('signup.jade', { message: req.flash('signupMessage') });
        });

        /**
         * Post to process the sign up form (uses Passport.JS)
         */
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/app', // redirect to the app
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


        /**
         * Safety, to ensure a user isLoggedIn then they may view app.jade.
         */
        app.get('/app', isLoggedIn, function(req, res) {
            res.render('app.jade', {
                username          : req.user.username,
                userID            : req.user.id,
                accountType       : req.user.accountType
                // get the user out of session and pass to template
            });
        });

        /**
         * Logout safely
         */
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });

        /**
         * End point for all auction creation requests
         */
        app.post('/createAuction', function(req, res) {
            console.log("we get this far: " + req.user.id);
            createAuction.addAuctionEntry(req.user.id, req.body, function(aucInfo, aucId){
                var auc1 = createAuction
                    .initialiseAuctionEngine(
                        aucInfo, aucId, io, auctionEventEmitter);
                //auctionListeners.push[auc1];
                auctionListeners[aucId] = auc1;
                aucInfo.id = aucId;
                //currentAuctions.push(aucInfo);
                currentAuctions[aucId] = aucInfo;
                io.sockets.emit('auctionList', currentAuctions);
                res.end();
            });
            res.end();
        });

        /**
         * End point for auction deletion
         */
        app.post('/deleteAuction', function(req, res){
            console.log('we get this far into delete');
            var aucID = req.body.id;
            createAuction.deleteAuction(aucID, req.user.id, req.user.accountType, function(id){
                if (currentAuctions.hasOwnProperty(id)
                    && auctionListeners.hasOwnProperty(id)) {
                    delete currentAuctions[id];
                    delete auctionListeners[id];
                    //console.log('obj: '+ obj.id);
                    auctionEventEmitter.emit('delete-' + id);
                    io.sockets.emit('auctionList', currentAuctions);
                }
            });
            res.end();
        });

        /**
         * returns an array of all created auctions dependent on the username/id
         */
        app.get('/completedAuctions', function(req, res) {
            postAucData.getResultsByUserID(req.user.id, 'creator', function(results){
                res.send(JSON.stringify(results));
            });
        });

        /**
         * returns an array of all won auctions dependent on the username/id
         */
        app.get('/wonAuctions', function(req, res) {
            postAucData.getResultsByUserID(req.user.id, 'winner', function(results){
                res.send(JSON.stringify(results));
            });
        });

        /**
         * returns an array of all unresolved auctions dependent on the username/id
         */
        app.get('/unresolvedAuctions', function(req, res) {
            postAucData.getUnresolvedByUserID(req.user.id, function (unresolvedList) {
                res.send(JSON.stringify(unresolvedList));
            });
        });

        /**
         * Returns the user details given an id
         */
        app.get('/contactDetails', function(req, res){
            postAucData.getContactDetailsByUserID(req.query.id, function(contactDetails){
                res.send(JSON.stringify(contactDetails));
                console.log(contactDetails);
            })
        });

        /**
         * Updates user profile info end point
         */
        app.get('/updateProfile', function(req, res){
            userUtilities.updateUserProfile(req.user.id, req.query, function (hasUpdated) {
               res.send(hasUpdated);
            });
        });

        /**
         * Get all user details - for admin
         */
        app.get('/allUserDetails', function(req, res){
            if(req.user.accountType === 'Admin'){
                adminData.getUserDetails(function(userDetails){
                    console.log(userDetails);
                    res.send(JSON.stringify(userDetails));
                });
            }
            else{
                res.send([])
            }

        });

        /**
         * Delete user
         */
        app.get('/deleteUser', function(req, res){
            if(req.user.accountType === 'Admin'){
                adminData.deleteUser(req.query.userID, function(hasDeleted){
                    console.log(hasDeleted);
                    res.send(hasDeleted);
                });
            }
            else{
                res.send(false);
            }
        });

        /**
         * Get suspicious users
         */
        app.get('/getSuspiciousUsers', function(req, res){
           createAuction.getSuspiciousUsers(function(suspUsers){
               res.send(JSON.stringify(suspUsers));
               console.log('Suspicious: ' + suspUsers);
           });
        });

        /**
         * Set listener for auction move event
         */
        auctionCompTasks.moveAuctionCompletedListener(auctionEventEmitter);

        /**
         * Updates the auction variable on this script whenever this event is heard
         */
        auctionEventEmitter.on('completedAucMoved', function(aucID) {
            if (currentAuctions.hasOwnProperty(aucID)
                && auctionListeners.hasOwnProperty(aucID)) {
                delete currentAuctions[aucID];
                delete auctionListeners[aucID];
                //console.log('obj: '+ obj.id);
                //auctionEventEmitter.emit('delete-' + aucID);
                io.sockets.emit('auctionList', currentAuctions);
            }
        });

    }

};

/**
 * isLoggedIn detects whether a user is logged in
 **/
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they are not redirect them to the home page
    res.redirect('/');
}
