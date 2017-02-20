/**
 * Created by Umar on 24/01/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var idSQL = null;
var userUtilities = require('../appModules/userUtilities');

module.exports = {

    addAuctionEntry : function (userID, insertionData, callback) {
        insertionData.creatorID = userID;
        insertionData.maxGuidePrice = (insertionData.protocol === 'Dutch' || insertionData.protocol === 'English') ?
            insertionData.maxGuidePrice : '';
        var query = ('INSERT INTO ' + dbconfig.database + '.' + dbconfig.auction_table + ' SET ?');
        connection.query(query, insertionData, function(err, res){
            if(err)
                throw err;
            console.log('Last insert ID: ' + res.insertId);

            callback(insertionData, res.insertId);
        });
    },

    initialiseAuctionEngine : function(aucInfo, id, io, CountdownTimer, protocols, socketTools, aucEventEmitter) {
        console.log("the id of this created initialiseAuctionEngine is: " + id);
        console.log(aucEventEmitter);
        //countdownTimer.removeAllListeners('stop');
        socketTools.messageEngine(io, id);
        switch (aucInfo.protocol){
            case 'Dutch':
                protocols.dutch(io, aucInfo, CountdownTimer, id, aucEventEmitter);
                break;
            case '1st-price-sealed':
                protocols.sealedBid(io, aucInfo, CountdownTimer, id, true, aucEventEmitter);
                break;
            case '2nd-price-sealed':
                protocols.sealedBid(io, aucInfo, CountdownTimer, id, false, aucEventEmitter);
                break;
            default:
               protocols.english(io, aucInfo, CountdownTimer, id, aucEventEmitter);
            break;
        }

    },

    pushAuctionsToClients_onConnection : function(io, auctions) {

        io.on('connection', function (socket){
            socket.emit('auctionList', auctions);
            //socket.broadcast.emit('auctionList', auctions);
        });


    },

    deleteAuction : function (auctionID, userID, callback) {
        var query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE id = ? AND creatorID = ?');
        connection.query(query, [auctionID, userID], function (err, result) {
            if(err)
                throw err;
            console.log('Record deleted ' + result.affectedRows + ' rows');
            if(result.affectedRows > 0){
                callback(auctionID);
            }
        });
    }

};