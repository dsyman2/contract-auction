/**
 * Created by Umar on 27/01/2017.
 *
 * If the server ever goes down this module loads up any
 * auctions which are complete before the system crashed.
 */
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

/**
 * This module gets any auctions which are in the DB and returns them
 * @type {{getAllCurrentAuctionsFromDB: module.exports.getAllCurrentAuctionsFromDB}}
 */
module.exports = {
    /**
     * Gets all auctions that are live from the database
     * @param callback
     */
    getAllCurrentAuctionsFromDB : function(callback){
        var results = {};
        var query = 'SELECT * FROM ' + dbconfig.database + '.' + dbconfig.auction_table;
        connection.query(query, function(err, rows){
            if (err)
                throw err;
            for(var i = 0; i < rows.length; i++){
                results[rows[i].id] = {
                    id          : rows[i].id,
                    name        : rows[i].name,
                    description : rows[i].description,
                    length      : rows[i].length,
                    protocol    : rows[i].protocol,
                    creatorID   : rows[i].creatorID,
                    maxGuidePrice : rows[i].maxGuidePrice,
                    contractType    : rows[i].contractType,
                    tradeType   : rows[i].tradeType
                };
            }
            callback(results);
        });
    }
};