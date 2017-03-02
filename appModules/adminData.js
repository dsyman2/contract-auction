/**
 * Created by Umar on 01/03/2017.
 */
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

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

var deleteAuctionData = function(userID, callback){
    var query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE creatorID = ?');
    connection.query(query, userID, function(err, res){
        if(err)
            throw err;
        console.log('Record deleted ' + res.affectedRows + ' rows');

        query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.results_table + ' WHERE creatorID = ? OR winnerID = ?');
        connection.query(query, userID, userID, function(err, res){
            if(err)
                throw err;
            console.log('Record deleted ' + res.affectedRows + ' rows');

            query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.unresolved_table + ' WHERE creatorID = ?');
            connection.query(query, userID, function (err, res) {
                if (err)
                    throw err;
                console.log('Record deleted ' + res.affectedRows + ' rows');
                callback();
            });
        });
    });


};

var deleteAuctionHistory = function(userID, callback){
    var query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.auction_table + ' WHERE creatorID = ?');
    connection.query(query, userID, function(err, res){
        if(err)
            throw err;
        console.log('Record deleted ' + res.affectedRows + ' rows');
        callback();
    });
};

var deleteResultHistory = function(userID, callback){
    query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.results_table + ' WHERE creatorID = ? OR winnerID = ?');
    connection.query(query, [userID, userID], function(err, res){
        if(err)
            throw err;
        console.log('Record deleted ' + res.affectedRows + ' rows');
        callback();
    });
};

var deleteUnresolvedHistory = function(userID, callback) {
    query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.unresolved_table + ' WHERE creatorID = ?');
    connection.query(query, userID, function (err, res) {
        if (err)
            throw err;
        console.log('Record deleted ' + res.affectedRows + ' rows');
        callback();
    });
};

module.exports = {
    getUserDetails : function(callback){
        var query = ('SELECT id, username, contactNumber, email, accountType, address FROM ' + dbconfig.database + '.'
        + dbconfig.users_table);
        connection.query(query, function (err, rows) {
            if(err)
                throw err;
            callback(rows);
        });
    },

    deleteUser : function(userID, callback) {
        userExists(userID, function(userExists){
           if(userExists){
              deleteAuctionHistory(userID, function(){
                 deleteResultHistory(userID, function(){
                     deleteUnresolvedHistory(userID, function(){
                         var query = ('DELETE FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE id = ?');
                         connection.query(query, userID, function(err, res){
                             if(err)
                                 throw err;
                             console.log('Record deleted ' + res.affectedRows + ' rows');
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