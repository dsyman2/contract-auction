var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var session  = require('express-session');
var app = express();

var passport = require('passport');
var flash    = require('connect-flash');

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

require('./config/passport')(passport); // pass passport for configuration


io.set("origins", "*:*");

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

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
});

connection.connect(function (err) {
    if(err) throw err
    console.log('you are now connected to mysql...');
});


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


require('./routes/routes.js')(app, passport); // load the routes and pass in our app and fully configured passport

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

server.listen(8000);

module.exports = app;