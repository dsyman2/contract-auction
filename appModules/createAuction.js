/**
 * Created by Umar on 24/01/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var idSQL = null;

module.exports = {
     getIDFromName : function (username, callback) {
        console.log("we're just before query 1");
        var query = ('SELECT id FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE username = ?');
        connection.query(query, username, function (err, rows, fields) {
            if (err)
                throw err;
            console.log("YOUL: " + rows[0].id);
            callback(rows[0].id);
        });
        return idSQL;
    },

    addAuctionEntry : function (insertionData, id, callback) {
        console.log("creatorID: " + id);

        insertionData.creatorID = id;
        var query = ('INSERT INTO ' + dbconfig.database + '.' + dbconfig.auction_table + ' SET ?');
        connection.query(query, insertionData, function(err, res){
           if(err)
               throw err;
           console.log('Last insert ID: ' + res.insertId);
           callback(insertionData, res.insertId);
        });
    },

    initialiseAuctionEngine : function(aucInfo, id, io, CountdownTimer, protocols) {
        console.log("the id of this created initialiseAuctionEngine is: " + id);
        var counter = 0;
        var countdownTimer = new CountdownTimer(0.000347222, id);
        //countdownTimer.on('tick')
        countdownTimer.start();
        countdownTimer.removeAllListeners('stop');


        if(aucInfo.protocol == "One"){
           protocols.closedAuctionUsage(io, countdownTimer, id);
       }
       else {
           var currentPrice = 9999;
           var currentBidder = null;

           io.on('connection', function (socket) {
               socket.emit('priceUpdate-' + id, currentPrice);
               socket.emit('timeRemaining-' + id, countdownTimer.time);
               socket.on('bid-' + id, function (data) {
                   var newBidPrice = parseInt(data.bid);
                   var newBidder = data.bidder;
                   console.log('BID: ' + newBidPrice + newBidder);
                   /*** TO BE CHANGED WITH PROTOCOL***/
                   if (currentPrice > newBidPrice) {
                       currentPrice = newBidPrice;
                       currentBidder = newBidder;
                       socket.emit('priceUpdate-' + id, currentPrice);
                       socket.broadcast.emit('priceUpdate-' + id, currentPrice);
                   }
               });

               countdownTimer.once('stop', function () {
                   // currentPrice, id, userID(of currentPrice)
                   counter++;
                   console.log('AUCTION: ' + id + " : " + counter);
                   //socket.broadcast.emit('auctionEnd-' + id, {})
                  // this.removeListener('stop');
                   countdownTimer.removeAllListeners('stop');
               });
           });
       }


    },

    pushAuctionsToClients_onConnection : function(io, auctions) {

        io.on('connection', function (socket){
            socket.emit('auctionList', auctions);
            //socket.broadcast.emit('auctionList', auctions);
        });


    }
};