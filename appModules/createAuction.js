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

    auction : function(aucInfo, id, io) {
        console.log("the id of this created auction is: " + id);
        var currentPrice = 9999;

        io.on('connection', function (socket) {
            socket.emit('priceUpdate-' + id, currentPrice);
            socket.on('bid-' + id, function (data) {
                var newBidPrice = parseInt(data);
                if (currentPrice > newBidPrice) {
                    currentPrice = newBidPrice;
                    socket.emit('priceUpdate-' + id, currentPrice);
                    socket.broadcast.emit('priceUpdate-' + id, currentPrice);
                }
            });
        });
    }


};