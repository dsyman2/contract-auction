/**
 * Created by Umar on 24/01/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var idSQL = null;
var userUtilities = require('../appModules/userUtilities');

/*var getIDFromName = function (username, callback) {
    console.log("we're just before query 1");
    var query = ('SELECT id FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE username = ?');
    connection.query(query, username, function (err, rows, fields) {
        if (err)
            throw err;
        console.log("YOUL: " + rows[0].id);
        callback(rows[0].id);
    });
    return idSQL;
}*/

module.exports = {

    addAuctionEntry : function (username, insertionData, callback) {
        userUtilities.getIDFromName(username, function(id){
            insertionData.creatorID = id;
            var query = ('INSERT INTO ' + dbconfig.database + '.' + dbconfig.auction_table + ' SET ?');
            connection.query(query, insertionData, function(err, res){
                if(err)
                    throw err;
                console.log('Last insert ID: ' + res.insertId);
                callback(insertionData, res.insertId);
            });
        });
    },

    initialiseAuctionEngine : function(aucInfo, id, io, CountdownTimer, protocols, socketTools, aucEventEmitter) {
        console.log("the id of this created initialiseAuctionEngine is: " + id);
        console.log(aucEventEmitter);
        //countdownTimer.removeAllListeners('stop');
        socketTools.messageEngine(io, id);
        switch (aucInfo.protocol){
            case 'Dutch':
                protocols.dutch(io, aucInfo, CountdownTimer, id, 99999, 1, aucEventEmitter);
                break;
            case '1st-price-sealed':
                protocols.sealedBid(io, aucInfo, CountdownTimer, id, true, 1, aucEventEmitter);
                break;
            case '2nd-price-sealed':
                protocols.sealedBid(io, aucInfo, CountdownTimer, id, false, 1, aucEventEmitter);
                break;
            default:
               protocols.english(io, aucInfo, CountdownTimer, id, 1, aucEventEmitter);
            break;
        }

    },

    pushAuctionsToClients_onConnection : function(io, auctions) {

        io.on('connection', function (socket){
            socket.emit('auctionList', auctions);
            //socket.broadcast.emit('auctionList', auctions);
        });


    },

    deleteAuction : function (auctionID, username, callback) {
        userUtilities.getIDFromName(username, function(userID){
            var query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE id = ? AND creatorID = ?');
            connection.query(query, [auctionID, userID], function (err, result) {
                if(err)
                    throw err;
                console.log('Record deleted ' + result.affectedRows + ' rows');
                if(result.affectedRows > 0){
                    callback(auctionID);
                }
            });
        })
    }

};