/**
 * Created by Umar on 15/02/2017.
 */
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var userUtilities = require('../appModules/userUtilities');

var auctionMoveToResult = function (aucInfo, aucEventEmitter) {
    userUtilities.getIDFromName(aucInfo.winnerID, function (userID) {
        aucInfo.winnerID = userID;
        auctionMoveToTable(aucInfo, dbconfig.results_table, aucEventEmitter);
    });
};

var auctionMoveToUnresolved = function (aucInfo, aucEventEmitter) {
    auctionMoveToTable(aucInfo, dbconfig.unresolved_table, aucEventEmitter);
};

var auctionMoveToTable = function (aucInfo, tableName, aucEventEmitter) {
    var query = ('INSERT INTO ' + dbconfig.database + '.' + tableName + ' SET ?');
    connection.query(query, aucInfo, function (err, res) {
        if (err)
            throw err;
        console.log('Record added ' + res.affectedRows + ' rows');
        var deletionQuery = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE id = ?');
        connection.query(deletionQuery, aucInfo.id, function (err, res) {
            if (err)
                throw err;
            console.log('Record deleted ' + res.affectedRows + ' rows');
            aucEventEmitter.emit('completedAucMoved', aucInfo.id);
        });
    });
};

module.exports = {
    moveAuctionCompletedListener: function (aucEventEmitter) {
        aucEventEmitter.on('moveCompletedAuc', function (auctionObj) {
            if (auctionObj.flag === 'result') {
                auctionMoveToResult(auctionObj.aucInfo, aucEventEmitter);
            }
            else if (auctionObj.flag === 'unresolved') {
                auctionMoveToUnresolved(auctionObj.aucInfo, aucEventEmitter);
            }

        });
    }
};