/**
 * Created by Umar on 12/02/2017.
 *
 * This script provides a module which has functions to get post auction data
 * these are called by end points but this module can be used anywhere where this data
 * is needed.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

/**
 * Module which has functions to get post auction data
 * @type {{getResultsByUserID: module.exports.getResultsByUserID,
 * getUnresolvedByUserID: module.exports.getUnresolvedByUserID,
 * getContactDetailsByUserID: module.exports.getContactDetailsByUserID}}
 */
module.exports = {

    /**
     * Gets all results associated with a user type and ID
     * @param userID
     * @param idTag
     * @param callback
     */
    getResultsByUserID : function(userID, idTag, callback){
        var queryIDTag = idTag === 'winner' ? 'winnerID' : 'creatorID';
        var query = ('SELECT * FROM ' + dbconfig.database + '.' + dbconfig.results_table + ' WHERE ' + queryIDTag + ' = ?');
        connection.query(query, [userID,userID], function(err, rows){
            if(err)
                throw err;
            callback(rows);
        });
    },

    /**
     * Gets all unresolved auctions associated with a user ID
     * @param userID
     * @param callback
     */
    getUnresolvedByUserID : function(userID, callback){
        var query = ('SELECT * FROM ' + dbconfig.database + '.' + dbconfig.unresolved_table + ' WHERE creatorID = ?');
        connection.query(query, userID, function(err, rows){
            if(err)
                throw err;
            callback(rows);
        });
    },

    getContactDetailsByUserID : function(userID, callback){
        var query = ('SELECT username, contactNumber, email, accountType FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE id = ?');
        connection.query(query, userID, function (err, rows) {
            if(err)
                throw err;
            callback(rows[0]);
        });
    }
};
