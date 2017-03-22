/**
 * Created by Umar on 15/02/2017.
 *
 * This is a module used after an auction has ended, it puts the results
 * of the auction in the correct table.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var userUtilities = require('../appModules/userUtilities');

/**
 * Adds the aucInfo the the correct table and removes the content from the
 * auction table
 * @param aucInfo
 * @param tableName
 * @param aucEventEmitter
 */
var auctionMoveToTable = function (aucInfo, tableName, aucEventEmitter) {
    var query = ('INSERT INTO ' + dbconfig.database + '.' + tableName + ' SET ?');
    connection.query(query, aucInfo, function (err, res) {
        if (err)
            throw err;
        var deletionQuery = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE id = ?');
        connection.query(deletionQuery, aucInfo.id, function (err, res) {
            if (err)
                throw err;
            aucEventEmitter.emit('completedAucMoved', aucInfo.id);
        });
    });
};

/**
 * Export to be used in caller script in this case routes.
 *
 * @type {{moveAuctionCompletedListener: module.exports.moveAuctionCompletedListener}}
 */
module.exports = {
    /**
     * Listener, waits for an auction that requests to be moved and then does
     * required process
     * @param aucEventEmitter
     */
    moveAuctionCompletedListener: function (aucEventEmitter) {
        aucEventEmitter.on('moveCompletedAuc', function (auctionObj) {
            if (auctionObj.flag === 'result') {
                var aucInfo = auctionObj.aucInfo;
                userUtilities.getIDFromName(aucInfo.winnerID, function (userID) {
                    aucInfo.winnerID = userID;
                    auctionMoveToTable(aucInfo, dbconfig.results_table, aucEventEmitter);
                });
            }
            else if (auctionObj.flag === 'unresolved') {
                auctionMoveToTable(auctionObj.aucInfo, dbconfig.unresolved_table, aucEventEmitter);
            }
        });
    }
};