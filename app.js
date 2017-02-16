/**
 * app.js is required by all node applications to be the central script, this is in fact the server. It is mainly used
 * as a place where application wide packages are imported. It also initialises the state of the server. By loading in
 * any auction which are not finished yet, this is in case the server has crashed unexpectedly.
 */

/**
 * Require --> This block is where packages are imported
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var app = express();
var routes = require('./routes/routes.js');

//needed for Passport.JS
var passport = require('passport');
var flash    = require('connect-flash');

//make this script a server
var http = require('http');
var server = http.createServer(app);

//socket.io and node events
var io = require('socket.io').listen(server);
var EventEmitter = require('events').EventEmitter;

//other utility scripts created by the developer
var createAuction = require('./appModules/createAuction.js');
var socketTools = require('./appModules/socketTools.js');
var CountdownTimer = require('./appModules/countdownTimer.js');
var protocols = require('./appModules/auctionProtocols.js');
var onServerStartup = require('./appModules/onServerStartup.js');

// pass passport for configuration
require('./config/passport')(passport);

//initialise
var auctionEventEmitter = new EventEmitter();
var auctionListeners = {};
var currentAuctions = {};

io.set("origins", "*:*");

//Scripts and modules that need to be used by the application
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/templates', express.static(__dirname + '/views/templates/'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'jade'); // set up ejs for templating
app.use(express.static(path.join(__dirname, 'public')));

//needed for passport.JS
app.use(session({
    secret: 'omgwafflesareawesome',
    resave: true,
    saveUninitialized: true
} )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


/**
 * Load up all current auctions into the server from the DB
 */
onServerStartup.getAllCurrentAuctionsFromDB(function(res){
    currentAuctions = res;
    setListenersForAuctions(function(){
        routes.updateAuctionVar(currentAuctions, auctionListeners);
        createAuction.pushAuctionsToClients_onConnection(io, currentAuctions);
        currentAuctions = {};
        auctionListeners = {};
    });
});

/**
 * used as a util function, calls script to set
 * auction listener variables
 * @param callback
 */
var setListenersForAuctions = function(callback){
    for (var key in currentAuctions) {
        if (currentAuctions.hasOwnProperty(key)) {
            var auc = currentAuctions[key];
            var createdAuc = createAuction
                .initialiseAuctionEngine(auc, auc.id, io, CountdownTimer, protocols, socketTools, auctionEventEmitter);
            auctionListeners[auc.id] = createdAuc;
        }
    }
    callback();
};

/**
 * Activate all routes with params required
 */
routes.init(app, passport, createAuction, io, CountdownTimer, protocols, socketTools, auctionEventEmitter);

/**
 * Catch the 404's
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//listen on this port
server.listen(8000);

module.exports = app;