/**
 * Created by Umar on 01/03/2017.
 *
 * This is a script which contains the module
 * which contains methods to access the database
 * which holds data which is useful to admins, all these functions
 * provide functionality for admin based data.
 */
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

/**
 * Checks if a user exists in the database
 * @param userID
 * @param callback
 */
var userExists = function(userID, callback){
    var query = ('SELECT * FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE id = ?');
    connection.query(query, userID, function(err, rows){
        if(err)
            throw err;

        if(rows.length > 0){
            callback(true);
        }
        else{
            callback(false);
        }
    })
};

/**
 * Deletes all auctions in the database created by a user with this ID
 * @param userID
 * @param callback
 */
var deleteAuctionHistory = function(userID, callback){
    var query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE creatorID = ?');
    connection.query(query, userID, function(err, res){
        if(err)
            throw err;
        callback();
    });
};

/**
 * Deletes all results in the database which involve this user ID
 * @param userID
 * @param callback
 */
var deleteResultHistory = function(userID, callback){
    query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.results_table + ' WHERE creatorID = ? OR winnerID = ?');
    connection.query(query, [userID, userID], function(err, res){
        if(err)
            throw err;
        callback();
    });
};

/**
 * Deletes all unresolved auctions in the database which involve this ID
 * @param userID
 * @param callback
 */
var deleteUnresolvedHistory = function(userID, callback) {
    query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.unresolved_table + ' WHERE creatorID = ?');
    connection.query(query, userID, function (err, res) {
        if (err)
            throw err;
        callback();
    });
};

/**
 * The module which is used by the caller, provides admin specific data tasks
 * @type {{getUserDetails: module.exports.getUserDetails, deleteUser: module.exports.deleteUser}}
 */
module.exports = {
    /**
     * Gets an array of all users in the database
     * @param callback
     */
    getUserDetails : function(callback){
        var query = ('SELECT id, username, contactNumber, email, accountType, address FROM ' + dbconfig.database + '.'
        + dbconfig.users_table);
        connection.query(query, function (err, rows) {
            if(err)
                throw err;
            callback(rows);
        });
    },

    /**
     * Deletes a user from the database along with their related data
     * @param userID
     * @param callback
     */
    deleteUser : function(userID, callback) {
        userExists(userID, function(userExists){
           if(userExists){
              deleteAuctionHistory(userID, function(){
                 deleteResultHistory(userID, function(){
                     deleteUnresolvedHistory(userID, function(){
                         var query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE id = ?');
                         connection.query(query, userID, function(err){
                             if(err)
                                 throw err;
                             callback(true);
                         });
                     });
                 });
              });
           }
           else{
               callback(false);
           }
        })
    }
};