/**
 * Created by Umar on 24/01/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var englishProtocol = require('../appModules/auctionProtocols/englishAuction');
var dutchProtocol = require('../appModules/auctionProtocols/dutchAuction');
var sealedProtocol = require('../appModules/auctionProtocols/sealedAuctions');
var messageEngine = require('../appModules/messageEngine');
var auctionFraud = require('./auctionFraud/auctionFraud');

module.exports = {

    /**
     * Inserts the auction creation data in the database
     *
     * @param userID
     * @param insertionData
     * @param callback
     */
    addAuctionEntry : function (userID, insertionData, callback) {
        insertionData.creatorID = userID;
        insertionData.maxGuidePrice = (insertionData.protocol === 'Dutch' || insertionData.protocol === 'English') ?
            insertionData.maxGuidePrice : '';
        var query = ('INSERT INTO ' + dbconfig.database + '.' + dbconfig.auction_table + ' SET ?');
        connection.query(query, insertionData, function(err, res){
            if(err)
                throw err;

            callback(insertionData, res.insertId);
        });
    },

    /**
     * Initiates the auction in questions, it starts the auction engine for the auction type
     *
     * @param aucInfo
     * @param id
     * @param io
     * @param aucEventEmitter
     */
    initialiseAuctionEngine : function(aucInfo, id, io, aucEventEmitter) {
        messageEngine.messageEngine(io, id);

        switch (aucInfo.protocol){
            case 'Dutch':
                dutchProtocol.dutch(io, aucInfo, id, aucEventEmitter, auctionFraud);
                break;
            case '1st-price-sealed':
                sealedProtocol.sealedBid(io, aucInfo, id, true, aucEventEmitter, auctionFraud);
                break;
            case '2nd-price-sealed':
                sealedProtocol.sealedBid(io, aucInfo, id, false, aucEventEmitter, auctionFraud);
                break;
            default:
                englishProtocol.english(io, aucInfo, id, aucEventEmitter, auctionFraud);
            break;
        }

    },

    /**
     * Emits all the auctions to listening clients when they connect
     *
     * @param io
     * @param auctions
     */
    pushAuctionsToClients_onConnection : function(io, auctions) {

        io.on('connection', function (socket){
            socket.emit('auctionList', auctions);
        });


    },

    /**
     * Deletes an auction from the auction database
     *
     * @param auctionID
     * @param userID
     * @param accountType
     * @param callback
     */
    deleteAuction : function (auctionID, userID, accountType, callback) {
        var query;
        if(accountType == 'Admin'){
            query = 'DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE id = ?'
        }
        else{
            query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE id = ? AND creatorID = ?');
        }

        connection.query(query, [auctionID, userID], function (err, res) {
            if(err)
                throw err;
            if(res.affectedRows > 0){
                callback(auctionID);
            }
        });
    },

    /**
     * Gets all suspicious users
     * @param callback
     */
    getSuspiciousUsers : function(callback){
        var suspUsers = auctionFraud.getAllSuspiciousUsers();
        callback(suspUsers);

    }

};