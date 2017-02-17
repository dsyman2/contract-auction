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
//var idSQL = null;
var userUtilities = require('../appModules/userUtilities');

module.exports = {
    getResultsByUserID : function(userID, idTag, callback){
        var queryIDTag = idTag === 'winner' ? 'winnerID' : 'creatorID';
        var query = ('SELECT * FROM ' + dbconfig.database + '.' + dbconfig.results_table + ' WHERE ' + queryIDTag + ' = ?');
        connection.query(query, [userID,userID], function(err, rows){
            if(err)
                throw err;
            callback(rows);
        });
    },

    getUnresolvedByUserID : function(userID, callback){
        var query = ('SELECT * FROM ' + dbconfig.database + '.' + dbconfig.unresolved_table + ' WHERE creatorID = ?');
        connection.query(query, userID, function(err, rows){
            if(err)
                throw err;
            callback(rows);
        });
    },

    getContactDetailsByUserID : function(userID, callback){
        var query = ('SELECT username, contactNumber, email FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE id = ?');
        connection.query(query, userID, function (err, rows) {
            if(err)
                throw err;
            callback(rows[0]);
        });
    }
};
