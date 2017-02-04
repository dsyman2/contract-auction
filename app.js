var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var routes = require('./routes/index');
var session  = require('express-session');
var app = express();
var routes = require('./routes/routes.js');


var passport = require('passport');
var flash    = require('connect-flash');

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var createAuction = require('./appModules/createAuction.js');
var auctionListeners = [];
var currentAuctions = [];

require('./config/passport')(passport); // pass passport for configuration


io.set("origins", "*:*");

var socketTools = require('./appModules/socketTools.js');
//socketTools.auctionEngine(io);
socketTools.messageEngine(io);

var CountdownTimer = require('./appModules/countdownTimer.js');

/*
var currentPrice = 9999;

io.on('connection', function (socket) {
    socket.emit('priceUpdate', currentPrice);
    socket.on('bid', function (data) {
        var newBidPrice = parseInt(data);
        if(currentPrice > newBidPrice){
            currentPrice = newBidPrice;
            socket.emit('priceUpdate', currentPrice);
            socket.broadcast.emit('priceUpdate', currentPrice);
        }

    });
});

var msgs = [];

io.on('connection', function(socket){
    socket.emit('chat msgs', msgs);

    socket.on('chat msg', function(msg){
        msgs.push(msg);
        console.log("Message: " + msg);
        socket.emit('chat msg', msg);
        socket.broadcast.emit('chat msg', msg);
    });
});
*/

/*var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

connection.connect(function (err) {
    if(err) throw err
    console.log('you are now connected to mysql...');
});*/


app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/templates', express.static(__dirname + '/views/templates/'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'jade'); // set up ejs for templating

app.use(express.static(path.join(__dirname, 'public')));

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
var onServerStartup = require('./appModules/onServerStartup.js');

onServerStartup.getAllCurrentAuctionsFromDB(function(res){
    currentAuctions = res;
    setListenersForAuctions(function(){
        //require('./routes/routes.js')(app, passport, createAuction, io, currentAuctions, auctionListeners); // load the routes and pass in our app and fully configured passport
        routes.updateAuctionVar(currentAuctions, auctionListeners);
        createAuction.pushAuctionsToClients_onConnection(io, currentAuctions);
    });
});

var setListenersForAuctions = function(callback){
    for(var i = 0; i < currentAuctions.length; i++){
        var auc = createAuction.initialiseAuctionEngine(currentAuctions[i], currentAuctions[i].id, io, CountdownTimer);
        auctionListeners.push(auc);
    }
    callback();
};

/**
 * Activate all routes with params required
 */
routes.init(app, passport, createAuction, io, CountdownTimer);


//app.use('/', routes);

/**
 * Catch the 404's
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/*var countdownTimer = new CountdownTimer(12);
countdownTimer.on('tick', function(time) {
    console.log('stopwatch tick: ' + time);
});
countdownTimer.start();*/

server.listen(8000);

module.exports = app;